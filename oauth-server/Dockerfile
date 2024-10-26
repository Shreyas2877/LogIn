# Use an official Maven image to build the application
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Copy the pom.xml and source code into the container
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use an official OpenJDK image to run the application
FROM openjdk:17-jdk-slim

# Copy the built JAR file from the build image
COPY --from=build /app/target/oauth-server-0.0.1-SNAPSHOT.jar /usr/app/oauth-server.jar

# Expose the port the Spring Boot application runs on
EXPOSE 8081

# Run the JAR file
ENTRYPOINT ["java", "-jar", "/usr/app/oauth-server.jar"]
