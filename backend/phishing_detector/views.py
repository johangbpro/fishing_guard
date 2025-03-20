from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
import os
import json
import mistralai
from email import policy
from email.parser import BytesParser
import tempfile

class EmlParser:
    """Parser for .eml file and analyse it to detect if is fishing or not.

    Attributes:
        eml_path: path to .eml file
        msg: .eml parsed
        ia_agent: mistral ia agent API
    """
    def __init__(self):
        self.eml_path = None
        self.msg = {}
        self.ia_agent = mistralai.Mistral(api_key=os.getenv("MISTRAL_API_KEY"))

    @property
    def sender(self):
        return self.msg.get("from")

    @property
    def recipient(self):
        return self.msg['to']

    @property
    def date(self):
        return self.msg['date']

    @property
    def subject(self):
        return self.msg['subject']
    
    @property
    def body(self):
        if self.msg.is_multipart():
            for part in self.msg.iter_parts():
                if part.get_content_type() == "text/plain":
                    return part.get_payload(decode=True).decode(part.get_content_charset() or 'utf-8')
        else:
            return self.msg.get_payload(decode=True).decode(self.msg.get_content_charset() or 'utf-8')

    def parse(self, path):
        """Parse .eml.

        Args:
            path (str): path to .eml file
        """
        self.eml_path = path
        with open(self.eml_path, 'rb') as f:
            self.msg = BytesParser(policy=policy.default).parse(f)
        
    def analyse(self):
        """Analyse mail thanks to mistral ai agent.

        Args:
            None

        Return:
            dict: spam and details
        
        Example:
            {"spam": True, "details": "the domain name is suspicious"}
        """
        response = self.ia_agent.agents.complete(
            agent_id="ag:949278c1:20250319:untitled-agent:3eecace1",
            messages=[
                {
                    "role": "user",
                    "content": self._prompt,
                },
            ],
        )
        print(response.choices[0].message.content)
        return json.loads(response.choices[0].message.content)

    @property
    def _prompt(self):
        return f"""sender: {self.sender}
        recipient: {self.recipient}
        subject: {self.subject}
        body: {self.body}
        """


class EmailAnalysisViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['POST'])
    def analyze_email(self, request):
        try:
            email_file = request.FILES.get('email_file')
            if not email_file:
                return Response({'error': 'No email file provided'}, status=400)

            # Create a temporary file to store the uploaded content
            with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                for chunk in email_file.chunks():
                    temp_file.write(chunk)
                temp_path = temp_file.name

            try:
                eml = EmlParser()
                eml.parse(temp_path)
                analyse = eml.analyse()

                return Response({
                    'sender': eml.sender,
                    'subject': eml.subject,
                    'recipient': eml.recipient,
                    'date': eml.date,
                    'body': eml.body,
                    'is_suspicious': analyse["spam"],
                    'analysis': analyse["details"],
                })
            finally:
                # Clean up the temporary file
                os.unlink(temp_path)

        except Exception as e:
            # Log the error but don't raise it
            import traceback
            print(traceback.format_exc())
            return Response({'error': str(e)}, status=400)