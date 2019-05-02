# Technical Specification

## Architecture/Dataflow Chart

![Architecture/Dataflow Chart](architecture.png)

## Overview

The sections below describe architecture layers used in this application, as  well as give some rationale and general implementation guidelines.

## Components

"Presentational" or "dumb" components are the basic user interface (UI) building blocks. Here's where data gets displayed to the user. A component has a simple interface and no knowledge of or dependencies to other parts of application. It is stateless from application's point of view, but can keep some internal state for its own purposes. A well-designed component is easy to test, maintain and reuse.

A larger component may make use of one or more smaller components.

## Containers

"Containers" or "smart components" implement a part of application logic. A container glues together sub-containers and components and provides them with data. It usually also listens to and handles their events.

In a simple scenario without state management framework and no abstraction layers, a container may do all (external) data access and storage itself, but that's not a recommended practice. Almost always, at least data access logic should be [abstracted away to a backend service](##backend-services).

A container should not be too difficult to unit-test (using mocked sub-containers and components). It also serves as a good entry point for integration tests. Inherent specificity makes a container less likely to be reused, but we should always look to refactor (parts of) it to reusable components and keep its code to a minimum.

Typically, we have a root container that hosts several page containers, which in turn may include one or more sub-containers.

## Frontend Services

This layer is entirely optional. Containers may well access redux and backend services layers directly. It is being used in this application mainly to demonstrate one way of making containers not depend on a particular state management solution (in this case NgRx).

A frontend service should have a well-defined and easy-to-use interface (a facade) that simplifies data access for containers. It's best kept stateless, which reduces testing and maintenance efforts.

Frontend services are not to be confused with utility services.

## Redux

### Store

### Dispatchers

### Reducers

### Effects

## Backend Services
