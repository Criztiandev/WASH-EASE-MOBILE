# Wash-Ease-Mobile

Wash-Ease-Mobile is a convenient mobile application designed to connect users with laundry service providers, offering an easy way to schedule and manage laundry pickup and delivery.

## Features

- User registration and authentication
- Browse nearby laundry service providers
- Schedule laundry pickup and delivery
- Real-time order tracking
- In-app messaging with service providers
- Payment integration
- Order history and recurring order setup
- Ratings and reviews for service providers

## Tech Stack

- **Mobile App:**
  - React Native for cross-platform development
  - Redux for state management
  - React Navigation for routing

- **Backend:**
  - Node.js with Express.js
  - MongoDB for database
  - Mongoose as ODM
  - JSON Web Tokens (JWT) for authentication

- **APIs and Services:**
  - Google Maps API for location services
  - Stripe API for payment processing
  - Firebase Cloud Messaging for push notifications

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- React Native development environment
- MongoDB

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/wash-ease-mobile.git
   cd wash-ease-mobile
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add necessary environment variables (e.g., API keys, backend URL)

## Running the Application

1. Start the Metro bundler:
   ```
   npx react-native start
   ```

2. Run the app on Android:
   ```
   npx react-native run-android
   ```

   Or for iOS:
   ```
   npx react-native run-ios
   ```

## Usage

1. **User Registration:**
   - Open the app and tap on "Sign Up"
   - Fill in required details and verify your account

2. **Scheduling a Pickup:**
   - Browse available laundry services
   - Select a service provider
   - Choose pickup and delivery times
   - Confirm your order

3. **Tracking Your Order:**
   - View real-time updates on your order status
   - Communicate with the service provider if needed

## Contributing

We welcome contributions to Wash-Ease-Mobile! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Experience hassle-free laundry services with Wash-Ease-Mobile!
