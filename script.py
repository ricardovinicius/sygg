import requests
import json
import time
import os

def test_openrouter():
    # It's recommended to pull the API key from environment variables, 
    # but you can also replace the default value with your actual key
    api_key = "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"
    
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
    }
    
    payload = {
        "model": "stepfun/step-3.5-flash:free", # Make sure to change this to a free model if you want, e.g. 'mistralai/mistral-7b-instruct:free'
        "messages": [
            {
                "role": "user",
                "content": "What is the meaning of life? Keep it to 1 sentence."
            }
        ]
    }

    print("Starting 100 requests to test OpenRouter API...")
    
    success_count = 0
    error_count = 0

    for i in range(1, 101):
        try:
            print(f"[{i}/100] Sending request...", end=" ", flush=True)
            
            response = requests.post(
                url=url,
                headers=headers,
                data=json.dumps(payload)
            )
            
            if response.status_code == 200:
                print("SUCCESS")
                success_count += 1
            else:
                print(f"FAILED (Status: {response.status_code})")
                print(f"Response: {response.text}")
                error_count += 1
                
        except Exception as e:
            print(f"ERROR: {e}")
            error_count += 1
            
        # Add a delay between requests to avoid hitting rate limits too quickly, especially on free plans
        time.sleep(1)

    print("\n--- Summary ---")
    print(f"Total Requests: 100")
    print(f"Successful: {success_count}")
    print(f"Failed/Errors: {error_count}")

if __name__ == "__main__":
    test_openrouter()
