Feature: Notes shoud pass tests

  @browser
  Scenario: There should be no severe console log errors on index page
    Given I am on "homepage"
    When I check the console logs
    Then there should be no severe console log errors
