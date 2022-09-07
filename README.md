# Workout Planner

## Table of contents

1. [Overview](#overview)
2. [API Spec](#api)

<a id="overview"></a>

## 1. Overview

This is the server side of the application.
The client can be found [here](https://github.com/PBara7a/workout-planner-client).

App built with React, Node.js, Express, Prisma and PostgreSQL.

- SPA built to plan and save my workouts.
- Client retrieves and sends data through an Express API.
- Can send workouts by email via SendGrid API.

<a id="api"></a>

## 2. API Spec

<details>
<summary><strong>POST /login</strong>
</summary>

<strong>Example body</strong>

```sh
{
	"username": "test",
	"password": "test1"
}
```

<strong>Example response</strong>

```sh
{
	"user": {
		"id": 4,
		"username": "test",
		"createdAt": "2022-09-07T15:44:57.468Z",
		"updatedAt": "2022-09-07T15:44:57.469Z"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTY2MjU4MzAyMCwiZXhwIjoxNjYyNjY5NDIwfQ.j-ruc981Qm4e8hRp91TyaYTefLZE3r6GHXd5Ow6JScU"
}
```

</details>

<details>
<summary><strong>POST /user</strong>
</summary>

<strong>Example body</strong>

```sh
{
	"username": "test",
	"password": "test1"
}
```

<strong>Example response</strong>

```sh
{
	"user": {
		"id": 4,
		"username": "test",
		"password": "$2b$08$XSCitXp0EpxtDBX2ABRgY.lKm.UAzK5QYf3DlQjfHOB5CkMgLssMm",
		"createdAt": "2022-09-07T15:44:57.468Z",
		"updatedAt": "2022-09-07T15:44:57.469Z"
	}
}
```

</details>

<details>
<summary><strong>POST /workout</strong>
</summary>

<strong>Example body</strong>

```sh
{
	"name": "Burn Fiesta",
	"target": "Full Body",
	"notes": "Low weight and max reps",
	"exercises": [1, 2]
}
```

<strong>Example response</strong>

```sh
{
	"workout": {
		"id": 4,
		"name": "Burn Fiesta",
		"target": "Full Body",
		"notes": "Low weight and max reps",
		"createdAt": "2022-08-26T10:59:25.037Z",
		"updatedAt": "2022-08-26T10:59:25.038Z",
		"exercises": [
			{
				"id": 1,
				"name": "3/4 sit-up",
				"demo": "0001",
				"equipmentId": 1,
				"targetId": 1,
				"bodyPartId": 1,
				"createdAt": "2022-08-23T13:36:41.502Z",
				"updatedAt": "2022-08-23T13:36:41.516Z"
			},
			{
				"id": 2,
				"name": "45° side bend",
				"demo": "0002",
				"equipmentId": 1,
				"targetId": 1,
				"bodyPartId": 1,
				"createdAt": "2022-08-23T13:36:41.502Z",
				"updatedAt": "2022-08-23T13:36:41.516Z"
			}
		]
	}
}
```

</details>

<details>
<summary><strong>POST /email</strong>
</summary>

<strong>Example body</strong>

```sh
{
	"email": "email@gmail.com",
	"workout": 1
}
```

<strong>Example response</strong>

```sh
{
	"email": "Sent"
}
```

</details>

<details>
<summary><strong>GET /workout</strong>

</summary>

<strong>Example response</strong>

```sh
{
	"workouts": [
		{
			"id": 1,
			"name": "Workout 1: Upperbody",
			"target": "Upperbody",
			"notes": "8-12 reps",
			"createdAt": "2022-08-31T16:17:14.639Z",
			"updatedAt": "2022-08-31T16:17:14.640Z",
			"exercises": [
				{
					"id": 99,
					"name": "barbell bench press",
					"demo": "0025",
					"equipmentId": 97,
					"targetId": 9,
					"bodyPartId": 9,
					"createdAt": "2022-08-31T16:10:52.907Z",
					"updatedAt": "2022-08-31T16:10:52.920Z"
				},
				{
					"id": 475,
					"name": "dumbbell bench seated press",
					"demo": "0290",
					"equipmentId": 459,
					"targetId": 55,
					"bodyPartId": 55,
					"createdAt": "2022-08-31T16:10:52.910Z",
					"updatedAt": "2022-08-31T16:10:52.920Z"
				},
				{
					"id": 481,
					"name": "dumbbell biceps curl",
					"demo": "0294",
					"equipmentId": 459,
					"targetId": 43,
					"bodyPartId": 33,
					"createdAt": "2022-08-31T16:10:52.910Z",
					"updatedAt": "2022-08-31T16:10:52.920Z"
				},
				{
					"id": 581,
					"name": "dumbbell lying triceps extension",
					"demo": "0351",
					"equipmentId": 459,
					"targetId": 33,
					"bodyPartId": 33,
					"createdAt": "2022-08-31T16:10:52.911Z",
					"updatedAt": "2022-08-31T16:10:52.920Z"
				},
				{
					"id": 1063,
					"name": "pull-up",
					"demo": "0652",
					"equipmentId": 1,
					"targetId": 6,
					"bodyPartId": 6,
					"createdAt": "2022-08-31T16:10:52.916Z",
					"updatedAt": "2022-08-31T16:10:52.921Z"
				}
			]
		}
	]
}
```

</details>

<details>
<summary><strong>GET /exercise</strong>
</summary>

<strong>Example response</strong>

```sh
{
	"exercises": [
		{
			"id": 1,
			"name": "3/4 sit-up",
			"demo": "0001",
			"equipmentId": 1,
			"targetId": 1,
			"bodyPartId": 1,
			"createdAt": "2022-09-01T14:15:44.761Z",
			"updatedAt": "2022-09-01T14:15:44.774Z"
		},
		{
			"id": 2,
			"name": "45° side bend",
			"demo": "0002",
			"equipmentId": 1,
			"targetId": 1,
			"bodyPartId": 1,
			"createdAt": "2022-09-01T14:15:44.761Z",
			"updatedAt": "2022-09-01T14:15:44.774Z"
		}
  ]
}
```

</details>

<details>
<summary><strong>GET /equipment</strong>
</summary>

<strong>Example response</strong>

```sh
{
	"equipments": [
		{
			"id": 1,
			"name": "body weight",
			"createdAt": "2022-08-22T14:39:42.741Z",
			"updatedAt": "2022-08-22T14:39:42.750Z"
		},
		{
			"id": 6,
			"name": "cable",
			"createdAt": "2022-08-22T14:39:42.741Z",
			"updatedAt": "2022-08-22T14:39:42.750Z"
		}
  ]
}
```

</details>

<details>
<summary><strong>GET /body/parts</strong>
</summary>

<strong>Example body</strong>

<strong>Example response</strong>

```sh
{
	"bodyparts": [
		{
			"id": 1,
			"name": "waist",
			"createdAt": "2022-08-22T14:39:43.043Z",
			"updatedAt": "2022-08-22T14:39:43.052Z"
		},
		{
			"id": 4,
			"name": "upper legs",
			"createdAt": "2022-08-22T14:39:43.043Z",
			"updatedAt": "2022-08-22T14:39:43.052Z"
		}
  ]
}
```

</details>

<details>
<summary><strong>GET /body/targets</strong>
</summary>

<strong>Example response</strong>

```sh
{
	"targets": [
		{
			"id": 1,
			"bodyPartId": 1,
			"name": "abs",
			"createdAt": "2022-08-22T14:39:43.331Z",
			"updatedAt": "2022-08-22T14:39:43.341Z"
		},
		{
			"id": 4,
			"bodyPartId": 4,
			"name": "quads",
			"createdAt": "2022-08-22T14:39:43.331Z",
			"updatedAt": "2022-08-22T14:39:43.341Z"
		}
  ]
}
```

</details>
