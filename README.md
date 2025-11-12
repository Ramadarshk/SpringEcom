# Spring E-commerce Application 🛒

A full-stack e-commerce application built with **Spring Boot 3** backend and **React** frontend, featuring product management, shopping cart functionality, and image upload capabilities.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Backend Features
- ✅ RESTful API architecture
- ✅ CRUD operations for products
- ✅ Image upload and storage
- ✅ H2 in-memory database
- ✅ JPA/Hibernate integration
- ✅ Cross-Origin Resource Sharing (CORS) enabled
- ✅ Pre-populated sample data

### Frontend Features
- ✅ Modern React UI with Vite
- ✅ Product listing and filtering by category
- ✅ Add/Update/Delete products
- ✅ Shopping cart functionality
- ✅ Product image display
- ✅ Responsive Bootstrap design
- ✅ React Router for navigation
- ✅ Context API for state management

## 🛠️ Tech Stack

### Backend
- **Java 21**
- **Spring Boot 3.5.5**
- **Spring Data JPA**
- **H2 Database**
- **Lombok**
- **Maven**

### Frontend
- **React 18.2.0**
- **Vite 7.1.5**
- **React Router DOM 6.22.3**
- **Axios 1.6.8**
- **Bootstrap 5.3.3**
- **React Bootstrap 2.10.2**
- **React Icons 5.2.0**

## 📦 Prerequisites

Before running this application, make sure you have the following installed:

- **Java Development Kit (JDK) 21** or higher
- **Node.js 16+** and **npm**
- **Maven 3.6+** (or use the included Maven wrapper)
- **Git** (optional, for cloning)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd SpringEcom
```

### 2. Backend Setup
```bash
# Build the Spring Boot application
mvnw clean install

# Or on Windows
mvnw.cmd clean install
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

## ▶️ Running the Application

### Option 1: Run Backend and Frontend Separately

#### Start the Backend Server
```bash
# From the root directory
mvnw spring-boot:run

# Or on Windows
mvnw.cmd spring-boot:run
```
The backend server will start on **http://localhost:8080**

#### Start the Frontend Development Server
```bash
# From the frontend directory
cd frontend
npm run dev
```
The frontend will start on **http://localhost:5173** (default Vite port)

### Option 2: Access H2 Console
The H2 database console is available at:
- **URL**: http://localhost:8080/h2-console
- **JDBC URL**: `jdbc:h2:mem:productdb`
- **Username**: `root`
- **Password**: (leave empty)

## 🔌 API Endpoints

### Product Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/` | Welcome message |
| GET | `/api/products` | Get all products |
| GET | `/api/product/{id}` | Get product by ID |
| GET | `/api/product/{id}/image` | Get product image |
| POST | `/api/product` | Add new product (with image) |
| PUT | `/api/product/{id}` | Update product (with optional image) |
| DELETE | `/api/product/{id}` | Delete product |

### Request Examples

#### Get All Products
```bash
GET http://localhost:8080/api/products
```

#### Add New Product
```bash
POST http://localhost:8080/api/product
Content-Type: multipart/form-data

FormData:
- product: {JSON object with product details}
- imageFile: {image file}
```

#### Update Product
```bash
PUT http://localhost:8080/api/product/1
Content-Type: multipart/form-data

FormData:
- product: {JSON object with updated details}
- imageFile: {image file (optional)}
```

## 📁 Project Structure

```
SpringEcom/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/demoSpringwithSecurityEcom/
│   │   │       ├── controller/          # REST Controllers
│   │   │       │   └── ProductController.java
│   │   │       ├── model/               # Entity models
│   │   │       │   └── Product.java
│   │   │       ├── repository/          # JPA Repositories
│   │   │       │   └── ProductRepository.java
│   │   │       ├── service/             # Business logic
│   │   │       │   └── ProductService.java
│   │   │       └── DemoSpringwithSecurityEcomApplication.java
│   │   └── resources/
│   │       ├── application.properties   # Configuration
│   │       └── data1.sql               # Sample data
│   └── test/
├── frontend/
│   ├── src/
│   │   ├── components/                  # React components
│   │   │   ├── Home.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   ├── UpdateProduct.jsx
│   │   │   └── CheckoutPopup.jsx
│   │   ├── Context/                     # Context API
│   │   │   └── Context.jsx
│   │   ├── assets/                      # Static assets
│   │   ├── App.jsx                      # Main App component
│   │   ├── axios.jsx                    # Axios configuration
│   │   └── main.jsx                     # Entry point
│   ├── package.json
│   └── vite.config.js
├── pom.xml                              # Maven configuration
└── README.md
```

## ⚙️ Configuration

### Backend Configuration (application.properties)
```properties
spring.application.name=demoSpringwithSecurityEcom
spring.datasource.url=jdbc:h2:mem:productdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=root
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.defer-datasource-initialization=true
```

### Frontend Configuration (vite.config.js)
The frontend is configured to proxy API requests to the backend server. Update the proxy settings if needed.

### Product Model
```java
- id: Integer (auto-generated)
- name: String
- description: String
- brand: String
- price: BigDecimal
- category: String
- releaseDate: Date
- productAvailable: Boolean
- stockQuantity: Integer
- imageName: String
- imageType: String
- imageData: byte[] (LOB)
```

## 🎨 Key Features Explained

### Image Upload
- Products support image upload via multipart/form-data
- Images are stored as byte arrays in the database
- Images are retrieved and served with appropriate content types

### Category Filtering
- Products can be filtered by category
- Sample categories: Car (pre-populated with vehicle data)

### Shopping Cart
- Add products to cart
- Update quantities
- Remove items
- Checkout functionality

### State Management
- React Context API for global state
- Cart state management
- Product data synchronization

## 🧪 Testing

### Run Backend Tests
```bash
mvnw test

# Or on Windows
mvnw.cmd test
```

### Run Frontend Linting
```bash
cd frontend
npm run lint
```

## 🏗️ Building for Production

### Backend
```bash
mvnw clean package

# The JAR file will be created in target/ directory
java -jar target/demoSpringwithSecurityEcom-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build

# The production build will be in dist/ directory
npm run preview  # Preview production build
```

## 🔐 Security Notes
- CORS is enabled for development (adjust for production)
- H2 console is enabled (disable in production)
- No authentication implemented (add Spring Security as needed)

## 🐛 Troubleshooting

### Backend Issues
- **Port 8080 already in use**: Change the port in `application.properties` using `server.port=8081 or try another ports availble` 
- **Database errors**: Clear the H2 database by restarting the application

### Frontend Issues
- **Cannot connect to API**: Ensure backend is running on port 8080
- **CORS errors**: Verify `@CrossOrigin` annotation in controller
- **Module errors**: Delete `node_modules` and run `npm install` again

## 📝 Future Enhancements
- [ ] Add Spring Security for authentication
- [ ] Implement user registration and login
- [ ] Add payment gateway integration
- [ ] Implement order management
- [ ] Add product reviews and ratings
- [ ] Implement search functionality
- [ ] Add pagination for products
- [ ] Deploy to cloud platform

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author
Created as a demonstration of Spring Boot and React integration for e-commerce applications.

## 📞 Support
For issues, questions, or contributions, please open an issue in the repository.

---

**Happy Coding! 🚀**

