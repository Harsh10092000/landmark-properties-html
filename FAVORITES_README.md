# Favorites System Implementation

## Overview
This system allows users to save properties as favorites. Users can click on a star icon to add/remove properties from their favorites list.

## Components

### 1. FavoriteStar Component (`components/common/FavoriteStar.jsx`)
- **Purpose**: Displays a clickable star icon for favoriting properties
- **Props**:
  - `propertyId`: The ID of the property to favorite
  - `userId`: The ID of the current user
  - `initialFavorited`: Boolean indicating if property is already favorited
  - `size`: Size of the star icon (default: 24)
  - `className`: Additional CSS classes

### 2. API Route (`app/api/favorites/toggle/route.js`)
- **POST**: Add/remove property from favorites
- **GET**: Check if property is favorited by user

## Database Setup

Run the SQL commands from `favorites_table.sql` to create the required table:

```sql
CREATE TABLE IF NOT EXISTS `user_favorites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `property_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_property` (`user_id`, `property_id`)
);
```

## Usage Examples

### In TrendingProperties Component
```jsx
<FavoriteStar 
  propertyId={item.listing_id || item.pro_id} 
  userId={currentUser?.login_id || currentUser}
  size={20}
/>
```

### In PropertyCard Component
```jsx
<FavoriteStar 
  propertyId={item.listing_id || item.pro_id} 
  userId={currentUser?.login_id || currentUser}
  size={20}
/>
```

### In Property Detail Page
```jsx
<FavoriteStar 
  propertyId={propertyData?.listing_id || propertyData?.pro_id} 
  userId={currentUser?.login_id || currentUser}
  size={24}
/>
```

## Features

- **Visual Feedback**: Star changes from outline to filled when favorited
- **User Authentication**: Only logged-in users can save favorites
- **Database Storage**: Favorites are persisted in the database
- **Error Handling**: Proper error handling for API calls
- **Loading States**: Prevents multiple clicks while processing
- **Responsive Design**: Star icon is positioned absolutely on property images

## API Endpoints

### POST `/api/favorites/toggle`
**Request Body:**
```json
{
  "propertyId": "LM-12345",
  "userId": "user123",
  "action": "add" // or "remove"
}
```

**Response:**
```json
{
  "message": "Added to favorites successfully"
}
```

### GET `/api/favorites/toggle?userId=user123&propertyId=LM-12345`
**Response:**
```json
{
  "isFavorited": true
}
```

## Styling

The star component includes:
- Semi-transparent background with blur effect
- Drop shadow for better visibility
- Hover effects and transitions
- Responsive positioning (top-right corner of images)

## Security Considerations

- User authentication required for favorites
- Input validation on API endpoints
- SQL injection protection via parameterized queries
- Rate limiting should be implemented for production

## Future Enhancements

- Add favorites list page
- Implement favorites count display
- Add bulk favorite operations
- Implement favorites sharing
- Add email notifications for favorite updates
