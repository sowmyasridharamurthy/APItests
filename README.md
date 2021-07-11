# APItests
API tests using javascript

<h2>Description:</h2>
A simple javascript API test framework to execute tests on the sample API's defined in https://jsonplaceholder.typicode.com/


<h2> Pre-requisite </h2>
  
  Any code editor (e.g visual studio code)
  Install node
  Install Git
  
  
<h2>How to execute?</h2>
  
  1. Clone the code from github
  2. CD to the folder APItests
  3. npm init
  4. execute command 'npm test'
  
  <h2>Test Repot</h2>
  The tests are executed and the standard Mocha test report is displayed. 
  ![image](https://user-images.githubusercontent.com/35350156/125210240-bd165680-e29e-11eb-9bbb-d1462d6a7227.png)

<h3><i>NOTE</i></h3>
If the API services are instantiated locally, and tests are run then use the command "npm test_coverage", this shall show tabular format of test coverage.

<h2>Circle CI </h2>
The above API tests are configured in Circle CI for code builds and Nightly executions. 
link:- https://app.circleci.com/pipelines/github/sowmyasridharamurthy/APItests


  

