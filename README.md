# Test API

This README provides instructions on how to test the Movie App API.

## Prerequisites

- Node.js installed
- npm (Node Package Manager) installed
- Postman or any other API testing tool

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/test_api.git
   ```
2. Navigate to the project directory:
   ```sh
   cd test_api
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Running the API

1. Start the server:
   ```sh
   npm start
   ```
2. The API will be running at `http://localhost:3000`

## Testing the API

### Endpoints

- **GET /movies**: Retrieve a list of all movies
- **GET /movies/:id**: Retrieve a specific movie by ID
- **POST /movies**: Add a new movie
- **PUT /movies/:id**: Update an existing movie by ID
- **DELETE /movies/:id**: Delete a movie by ID

## Running Tests

To run the tests, use the following command:

```sh
npm test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
