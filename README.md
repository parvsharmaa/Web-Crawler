### LYNC Backend Developer Task

This project is based on Micro Service Architure which includes a web crawler and SDK designed to retrieve and access data from the internet.

## Web Crawler

The Web Crawler is a microservice responsible for searching the internet and collecting products data from various e-commerce sources. It performs web scraping operations to extract relevant information and returns the data for further processing. The Web Crawler is designed to be scalable and efficient, capable of handling multiple concurrent requests.

# Web Crawler implements Factory Design Pattern to ensure :

1. Dynamic Object Creation: The factory pattern allows for the dynamic creation of different types of web crawlers based on specific requirements or configurations.
2. Encapsulation: By encapsulating the object creation logic within the factory class, we can abstract away the details of the crawler's instantiation process from the client code.
3. Flexibility: The factory pattern provides flexibility by enabling the addition of new crawler types or variations without modifying existing client code.
4. Configuration Management: It facilitates the management of different configurations or settings for each type of web crawler, making it easier to maintain and update.
5. Dependency Injection: The factory pattern promotes dependency injection, allowing the client code to interact with the web crawler interface rather than directly with concrete implementations, thus improving modularity and testability.

# Features

- Microservice solely focused on extracting the data
- Searches the internet for data
- Performs web scraping to extract information
- Returns the data to affected entities
- Scalable architecture for handling high volumes of requests

## SDK (Software Development Kit)

The SDK provides a convenient interface for developers to access the data collected by the Web Crawler. It exposes methods for retrieving search results, analyzing trends, and accessing other relevant information stored in the database. The SDK is designed to be user-friendly and easy to integrate into existing applications.

# SDK implements Singleton Design Pattern to ensure :

1. Global Access: The singleton pattern ensures that there is only one instance of the SDK class throughout the application's lifecycle, providing global access to its methods and properties.
2. Resource Management: Since the SDK may involve resource-intensive operations or maintain global state (such as authentication tokens), using a singleton ensures efficient resource utilization and avoids unnecessary duplication.
3. Consistency: By having a single instance of the SDK, we can maintain consistency in its state and behavior across different parts of the application, preventing inconsistencies that may arise from multiple instances.
4. Initialization Control: The singleton pattern allows us to control the initialization process of the SDK, ensuring that it is properly configured and ready for use before being accessed by other components.
5. Concurrency Control: In multi-threaded environments, the singleton pattern provides a mechanism for thread-safe access to shared resources, preventing race conditions and ensuring data integrity.

# Features

- Provides methods for accessing search results within the Database.
- Analyzes trends and patterns in the collected data.
- Easy-to-use interface for developers.
- Faster retults for search queries via Indexing.
- Rate Limiter to prevent system overload, ensure fair resource allocation and mitigate DoS attacks.
- Seamless integration with other applications.
- Provides User Authentication and Authorization for security.
- Uses MongoDB Atlas (NoSQL) for easy and secure data storage.

## Installation and Setup

# To use the Web Crawler and SDK via Docker Compose, follow these steps:

1. Clone the repository to your local machine.
2. Install Docker and Docker Compose if you haven't already.
3. Build the Docker images for the Web Crawler and SDK using the provided Dockerfiles.
4. Push the Docker images to Docker Hub or any other container registry.
5. Update the `docker-compose.yml` file with the appropriate image names and tags.
6. Run `docker-compose up` to start the services.
7. At last, Run `docker-compose-down` to stop and remove the container services.

# To run the developed system using Docker Hub, you can use the following commands

1. For Web Crawler -
   Run `docker run -d -p 8080:8080 parvsharmaa/web-crawler:latest`

2. For SDK -
   Run `docker run -d -p 3000:3000 parvsharmaa/sdk-node:latest`

# Note : 
After successfully running the services, you can access the servers on Port numbers 3000 (for sdk) and 8080 (for web-crawler) respectively.

## POSTMAN Api Documentation

# Web Crawler

- `/scrape` (POST) : Scrapes the data from website for a particular search phase and returns the products list . Expects 3 body parameters :

    1. website (string) : The website name to scrape the products list. (Required) 
    2. searchPhrase (string) : The search keyword for the product. (Required) 
    3. scrapeToPage (integer) : The page number till which to scrape the products list. (Optional) 
    
    Ideal Response: `{ message: "Scraping successful", data: [ ...productsList ]}`

# SDK

- `/auth/register` (POST) : Registers a new user to the sdk. Expects 2 body parameters :

    1. email (string) : The user email for which you want to create account for.
    2. password (string) : The password for accessing the account.

    Ideal Response: `{ message: "User registered successfully" }`

- `/auth/login` (POST) : Initializes the SDK and provides authentication token to access SDK routes. Expects 2 body parameters :

    1. email (string) : The user email for login.
    2. password (string) : The password for authentication.

    Ideal Response: `{ token: "<USER_TOKEN>" }`

- `/products/search` (GET) : Searches the provided keyword in the database. Expects 1 query parameter :

    1. q (query string) : The search query, for example `/products/search?q={value}` where value is a string keyword to search for.

    Ideal Response:  If found `{ products: [ ...productList ] }` else `{ products: [] }`
    Note: User must be authenticated before calling this method.

- `/products/num-searches` (GET) : Shows the number of Search hits by the user. 

    Ideal Response: `{ searches: <INTEGER_VALUE> }`
    Note: User must be authenticated before calling this method.

- `/products/recent-searches` (GET) : Returns a list of upto 10 recent Search object made by the user.

    Ideal Response: `{ recentSearches: [ ...searchObjects ] }`
    Note: User must be authenticated before calling this method.

- `/products/most-searched` (GET) : Returns the most searched keyword object by the user.

    Ideal Response: `{ mostSearchedKeywords: { query : <SEARCH_KEYWORD>}, ... }`
    Note: User must be authenticated before calling this method.

- `/products/advance-search` (GET) : Searches keyword in db and if not found scrapes data from crawler, stores results in DB. Expects 1 query parameter :

     1. q (query string) : The search query, for example `/products/advance-search?q={value}` where value is a string keyword to search for.

    Ideal Response:  If found `{ products: [ ...productList ] }` else `{ message: "Data scraped and stored successfully", products: [ ...productsList ] }`
    Note: User must be authenticated before calling this method.

- `/crawl` (POST) : Scrapes the data from website for a particular search phase, stores and returns products list . Expects 2 body parameters :

    1. website (string) : The website name to scrape the products list. (Optional - only Amazon supported) 
    2. searchPhrase (string) : The search keyword for the product. (Required) 
    3. scrapeToPage (integer) : The page number till which to scrape the products list. (Optional)
    
    Ideal Response: `{ message: "Data scraped and stored successfully", products: [ ...productsList ] }`
    Note: User must be authenticated before calling this method.



