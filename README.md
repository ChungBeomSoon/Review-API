# Review-API

## Overview

-   Create review APIs with Express(NodeJS) and MongoDB.

## Structure

```
├── api
│ ├── error-handler.js
│ ├── review-api.js
│ └── shop-api.js
├── models
│ ├── auto-id-setter.js
│ ├── review.js
│ └── shop.js
├── index.js
└── README.md
```

## Database

<br>

### Review

| Column      | Type   | Property     | Description                |
| ----------- | ------ | ------------ | -------------------------- |
| shopName    | String | required, PK | Name of the shop           |
| author      | String | required     | author of the review       |
| date        | Date   | required     | written date of the review |
| description | String | optional     | review contents            |
| keyword     | String | optional     | tags                       |

<br>

### Shop

| Column   | Type   | Property     | Description          |
| -------- | ------ | ------------ | -------------------- |
| shopName | String | required, PK | Name of the shop     |
| shopType | String | required     | food genre           |
| location | String | required     | location of the shop |

<br>

## Function

<br>

| URI                  | POST                | GET                                  | PUT                                 | DELETE                             |
| -------------------- | ------------------- | ------------------------------------ | ----------------------------------- | ---------------------------------- |
| /reviews             | Register new review | Retrieve all reviews                 | X                                   | Delete all reviews                 |
| /reviews/{review-id} | X                   | Retrieve review based on {review-id} | Updated review based on {review-id} | Delete review based on {review-id} |
| /shops               | Register new shop   | Retrive all shops                    | X                                   | Delete all shops                   |
| /shops/{shop-id}     | X                   | Retrieve shop based on {shop-id}     | Update shop based on {shop-id}      | Delete shop based on {shop-id}     |
