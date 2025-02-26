from django.core.exceptions import RequestDataTooBig
from django.http import HttpResponse
import socket
import logging

logger = logging.getLogger(__name__)

class BrokenPipeErrorMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)
            return response
        except socket.error as e:
            if str(e) == '[Errno 32] Broken pipe':
                logger.info('Broken Pipe Error - Client disconnected')
                return HttpResponse()  # Return empty response
            raise  # Re-raise other socket errors