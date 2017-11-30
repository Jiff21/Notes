Feature: Example.com should have a head

  @browser
  Scenario: There should be no severe console log errors on index page
    Given I am on "index"
    When I check the console logs
    Then there should be no severe console log errors
