Clicpilot-js support to create and run test automaticly, which can save the testing effort. And it is based on QUnit.

The basic idea of clicpilot-js test is to capture the input and output of an action in test case creating, the output is saved as expected results of the test case. When running the test cases, use the input to invoke the action, and compare the output with the expected result. 

Tester can open the web applicaion in __Test__ view and use the application, the testcases will be automaticly recorded during using the application and the testcase can be exported as a JSON file. Put the JSON into the web application, then the test cases can be used in regression test.

Here is an instructions of how to use __Test__ view.

1. Click "Run Application" button or select the page you want to test, and then click "Run Page".

2. After the page loaded and when you want to start reording testcases, click "Start" button.

3. In the web application page, do your testing step by step. Click "Pause" and "Resume", if you want to keep some operations from recording.

4. Click "Complete" buuton to finish the recording. 

5. Input a name for the testcase in the popup input dialog.

6. In the "Run test case" area, find the testcase and click the "Run" button to test.

7. Click "Export" button to export the testcases in a zip file. the zip file can be imported by clicking "Import" button.

8. If you want to include the testcases in your web application. Please see the chapter __Mutiple Files__.

Here is an example of a web application which has a testcase with it.

Click "Run the code" and go to the __clicpilot-js console__, in the __Test__ view, the testcase "test01" can be found. Click "Run" to see if it passed or not.




