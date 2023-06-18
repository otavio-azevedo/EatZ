# 4. Tests

This section should contain the project's testing strategy, including its unit, integration and performance tests.

## 4.1 Unit Tests

Unit tests make up the first layer of tests, they are carried out during the development of the application's functionalities in the back-end, with the objective of validating the codes developed separately from a micro view of the context. With this, it is possible to guarantee the correct functioning of the implementation carried out, in addition to facilitating the maintenance of the project in the future.
For the implementation of the unit tests, the open source framework xUnit was used for the construction and execution of the tests, due to its consolidated trajectory and popularity in the .NET ecosystem. Complementarily, with the aim of isolating external dependencies in unit tests, the Moq library was used in most of the tests.

## 4.2 Integration Tests

The second test layer of the solution consists of integration tests, which were developed with the aim of verifying the correct operation of different parts of the system in an integrated manner. In this sense, it is possible to assess whether the communication between the API layers and the database itself is being carried out as expected.
The integration tests were developed using the Postman platform, due to the ease of implementation of calling API routes and the possibility of automating the execution of tests in the continuous integration stage. In addition, it is possible to guarantee more objectively whether the routes developed in the APIs meet the project premises as expected.

## 4.3 Performance Tests

Finally, we have the load tests, with the main objective of validating the application's performance in different usage scenarios. In this project, the load tests were implemented in specific points of the application where the expected user traffic is logically higher than other less relevant points. The implementation of the tests was carried out using the K6 open source tool, as it is a more recent technology, with good performance and use oriented towards a better developer experience, unlike other market options. In an auxiliary way, K6 Cloud was used, K6's own service to 43 test management and automatic generation of graphs for analysis using up to 50 virtual users.