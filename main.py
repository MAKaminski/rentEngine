#!/usr/bin/env python3
"""
RentEngine API Tester - Python Implementation
Alternative Python-based testing for the RentEngine careers API endpoint.
"""

import requests
import json
import time
from typing import Dict, Any, Optional
from dataclasses import dataclass
import sys

@dataclass
class TestResult:
    payload_name: str
    payload: Dict[str, Any]
    response: Dict[str, Any]
    status_code: int
    success: bool
    duration: float
    errors: Optional[list] = None

class RentEngineApiTester:
    def __init__(self, base_url: str = "https://app.rentengine.io/api/public/v1"):
        self.base_url = base_url
        self.timeout = 10
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'User-Agent': 'RentEngine-API-Tester/1.0'
        })

    def test_endpoint_info(self) -> None:
        """Test endpoint information and allowed methods."""
        print("🔍 Testing endpoint information...\n")
        
        try:
            response = self.session.get(f"{self.base_url}/careers/apply", timeout=self.timeout)
            print(f"Status: {response.status_code}")
            print("Headers:", dict(response.headers))
            print("Body:", response.text)
        except requests.exceptions.RequestException as e:
            print(f"Endpoint test failed: {e}")

    def submit_application(self, payload: Dict[str, Any]) -> TestResult:
        """Submit application and return detailed result."""
        start_time = time.time()
        
        try:
            response = self.session.post(
                f"{self.base_url}/careers/apply",
                json=payload,
                timeout=self.timeout
            )
            
            duration = time.time() - start_time
            
            try:
                response_data = response.json()
            except json.JSONDecodeError:
                response_data = {"raw_response": response.text}
            
            return TestResult(
                payload_name="test_payload",
                payload=payload,
                response=response_data,
                status_code=response.status_code,
                success=200 <= response.status_code < 300,
                duration=duration
            )
            
        except requests.exceptions.RequestException as e:
            duration = time.time() - start_time
            return TestResult(
                payload_name="test_payload",
                payload=payload,
                response={"error": str(e)},
                status_code=0,
                success=False,
                duration=duration,
                errors=[str(e)]
            )

    def run_comprehensive_tests(self) -> list[TestResult]:
        """Run all test payloads against the API."""
        test_payloads = {
            "minimal": {
                "name": "Jane Doe",
                "email": "jane@example.com",
                "phoneNumber": "+1-555-123-4567",
                "githubUrl": "https://github.com/janedoe"
            },
            "with_username": {
                "name": "John Smith",
                "email": "john@example.com",
                "phoneNumber": "+1-555-987-6543",
                "githubUsername": "johnsmith"
            },
            "full": {
                "name": "Alice Johnson",
                "email": "alice@example.com",
                "phoneNumber": "+1-555-456-7890",
                "githubUrl": "https://github.com/alicejohnson",
                "cvUrl": "https://example.com/cv.pdf",
                "resumeUrl": "https://example.com/resume.pdf",
                "desiredSalary": "$120,000 - $150,000",
                "desiredStartDate": "2024-02-01",
                "additionalInfo": "Passionate about React and full-stack development",
                "portfolioUrl": "https://alicejohnson.dev",
                "linkedinUrl": "https://linkedin.com/in/alicejohnson",
                "experience": "5+ years full-stack development",
                "skills": "React, TypeScript, Node.js, PostgreSQL",
                "coverLetter": "I am excited about the opportunity..."
            },
            "invalid_email": {
                "name": "Bob Wilson",
                "email": "invalid-email",
                "phoneNumber": "+1-555-111-2222",
                "githubUrl": "https://github.com/bobwilson"
            },
            "missing_github": {
                "name": "Carol Brown",
                "email": "carol@example.com",
                "phoneNumber": "+1-555-333-4444"
            }
        }
        
        results = []
        print("🧪 Running comprehensive API tests...\n")
        
        for name, payload in test_payloads.items():
            print(f"Testing {name}...")
            result = self.submit_application(payload)
            result.payload_name = name
            results.append(result)
            self._log_result(result)
        
        return results

    def _log_result(self, result: TestResult) -> None:
        """Log test result in a formatted way."""
        status = "✅" if result.success else "❌"
        print(f"{status} {result.payload_name} ({result.duration:.0f}ms)")
        print(f"   Status: {result.status_code}")
        print(f"   Response: {json.dumps(result.response, indent=2)}")
        if result.errors:
            print(f"   Errors: {', '.join(result.errors)}")
        print()

    def generate_report(self, results: list[TestResult]) -> None:
        """Generate comprehensive test report."""
        print("\n📊 Test Report Summary")
        print("=====================")
        
        successful = sum(1 for r in results if r.success)
        total = len(results)
        
        print(f"Total tests: {total}")
        print(f"Successful: {successful}")
        print(f"Failed: {total - successful}")
        print(f"Success rate: {(successful / total * 100):.1f}%")
        
        if results:
            avg_duration = sum(r.duration for r in results) / len(results)
            print(f"Average duration: {avg_duration:.0f}ms")
        
        print("\nFailed tests:")
        for result in results:
            if not result.success:
                print(f"- {result.payload_name}: {result.status_code} - {result.response.get('error', 'API error')}")

def main():
    """Main entry point for the Python API tester."""
    tester = RentEngineApiTester()
    
    if len(sys.argv) > 1:
        command = sys.argv[1]
        
        if command == "info":
            tester.test_endpoint_info()
        elif command == "live":
            print("🌐 Testing Live RentEngine API...\n")
            result = tester.submit_application({
                "name": "Test User",
                "email": "test@example.com",
                "phoneNumber": "+1-555-123-4567",
                "githubUrl": "https://github.com/testuser"
            })
            tester._log_result(result)
        else:
            print("Unknown command. Use: info, live, or no arguments for full test suite")
    else:
        # Run comprehensive tests
        results = tester.run_comprehensive_tests()
        tester.generate_report(results)

if __name__ == "__main__":
    main()
