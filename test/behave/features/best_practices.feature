Feature: My notes should follow best practices

  Scenario: There should be no errors returned when I run html validation
    Given html exists in expect file
    When I run the validator
    Then no validator errors should exist
