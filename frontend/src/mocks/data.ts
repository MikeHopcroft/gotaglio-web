import {TreeNode} from '../dataModel';

export const tree1: TreeNode = {
  id: 0,
  type: 'root',
  name: 'root',
  description: 'root',
  children: {
    projects: [
      {
        id: 1,
        type: 'Project',
        name: 'Project 1',
        description: 'Description for Project 1',
        children: {},
      },
      {
        id: 2,
        type: 'Project',
        name: 'Project 2',
        description: 'Description for Project 2',
        children: {
          suites: [
            {
              id: 4,
              type: 'Suite',
              name: 'Suite 4',
              description: 'Description for Suite 4',
              children: {},
            },
            {
              id: 5,
              type: 'Suite',
              name: 'Suite 5',
              description: 'Description for Suite 5',
              children: {},
            },
            {
              id: 6,
              type: 'Suite',
              name: 'Suite 6',
              description: 'Description for Suite 6',
              children: {
                cases: [
                  {
                    id: 13,
                    type: 'Case',
                    name: 'Description for Case 13',
                    description: '46571d41-4d30-4923-b8a1-5fd80dc4d642',
                    children: {},
                  },
                  {
                    id: 14,
                    type: 'Case',
                    name: 'Description for Case 14',
                    description: 'ca18a32b-07cf-4884-9d5c-9e0d3b9ba5dc',
                    children: {},
                  },
                ],
              },
            },
            {
              id: 7,
              type: 'Suite',
              name: 'Suite 7',
              description: 'Description for Suite 7',
              children: {},
            },
          ],
          runs: [
            {
              id: 4,
              type: 'Run',
              name: 'e40a7465-33a1-4dd2-b5a2-cd9179dc4f4f',
              description: 'Run 4',
              children: {},
            },
            {
              id: 5,
              type: 'Run',
              name: '66631914-b8a8-4f76-8307-e39ba320a6dc',
              description: 'Run 5',
              children: {},
            },
            {
              id: 6,
              type: 'Run',
              name: '5b1754a8-c395-4633-996b-4ee1950d18f0',
              description: 'Run 6',
              children: {},
            },
          ],
        },
      },
      {
        id: 3,
        type: 'Project',
        name: 'Project 3',
        description: 'Description for Project 3',
        children: {},
      },
    ],
  },
};

export const tree2: TreeNode = {
  "id": 0,
  "type": "root",
  "name": "root",
  "description": "root",
  "children": {
    "projects": [
      {
        "id": 1,
        "type": "Project",
        "name": "Project 1",
        "description": "Description for Project 1",
        "children": {}
      },
      {
        "id": 2,
        "type": "Project",
        "name": "Project 2",
        "description": "Description for Project 2",
        "children": {
          "suites": [
            {
              "id": 4,
              "type": "Suite",
              "name": "Suite 4",
              "description": "Description for Suite 4",
              "children": {}
            },
            {
              "id": 5,
              "type": "Suite",
              "name": "Suite 5",
              "description": "Description for Suite 5",
              "children": {}
            },
            {
              "id": 6,
              "type": "Suite",
              "name": "Suite 6",
              "description": "Description for Suite 6",
              "children": {
                "cases": [
                  {
                    "id": 11,
                    "type": "Case",
                    "name": "Description for Case 11",
                    "description": "bb6ff50f-552b-4c7f-bb5e-1e807ca56132",
                    "children": {}
                  },
                  {
                    "id": 12,
                    "type": "Case",
                    "name": "Description for Case 12",
                    "description": "68e777aa-d310-499f-a1d2-0405e01dc453",
                    "children": {}
                  }
                ]
              }
            }
          ],
          "annotations": [
            {
              "id": 4,
              "type": "Annotation",
              "name": "Annotation 4",
              "description": "Description for Annotation 4",
              "children": {}
            },
            {
              "id": 5,
              "type": "Annotation",
              "name": "Annotation 5",
              "description": "Description for Annotation 5",
              "children": {}
            }
          ],
          "runs": [
            {
              "id": 2,
              "type": "Run",
              "name": "5d00a7ea-2275-4216-a2b8-adcb419e2cbf",
              "description": "Run 2",
              "children": {}
            },
            {
              "id": 3,
              "type": "Run",
              "name": "1af3b62e-671a-4229-a2bc-058152f48a11",
              "description": "Run 3",
              "children": {}
            }
          ]
        }
      },
      {
        "id": 3,
        "type": "Project",
        "name": "Project 3",
        "description": "Description for Project 3",
        "children": {}
      },
      {
        "id": 4,
        "type": "Project",
        "name": "Project 4",
        "description": "Description for Project 4",
        "children": {}
      }
    ]
  }
}


// export const tree2: TreeNode = {
//   id: 0,
//   type: 'root',
//   name: 'root',
//   description: 'root',
//   children: {
//     projects: {
//       '1': {
//         id: 1,
//         name: 'Project 1',
//         description: 'Description for Project 1',
//         children: {
//           suites: [1, 2, 3],
//           annotations: [1, 2, 3],
//           runs: [1],
//         },
//       },
//       '2': {
//         id: 2,
//         name: 'Project 2',
//         description: 'Description for Project 2',
//         children: {
//           suites: [4, 5, 6],
//           annotations: [4, 5],
//           runs: [2, 3],
//         },
//       },
//       '3': {
//         id: 3,
//         name: 'Project 3',
//         description: 'Description for Project 3',
//         children: {
//           suites: [7, 8, 9, 10],
//           annotations: [6, 7],
//           runs: [4, 5],
//         },
//       },
//       '4': {
//         id: 4,
//         name: 'Project 4',
//         description: 'Description for Project 4',
//         children: {
//           suites: [11, 12],
//           annotations: [8, 9],
//           runs: [6, 7, 8, 9],
//         },
//       },
//     },
//     annotations: {
//       '1': {
//         id: 1,
//         name: 'Annotation 1',
//         description: 'Description for Annotation 1',
//         instructions: 'instructions for Annotation 1',
//         template: 'Template for Annotation 1',
//         children: {
//           sessions: [1, 2, 3],
//         },
//       },
//       '2': {
//         id: 2,
//         name: 'Annotation 2',
//         description: 'Description for Annotation 2',
//         instructions: 'instructions for Annotation 2',
//         template: 'Template for Annotation 2',
//         children: {
//           sessions: [4, 5],
//         },
//       },
//       '3': {
//         id: 3,
//         name: 'Annotation 3',
//         description: 'Description for Annotation 3',
//         instructions: 'instructions for Annotation 3',
//         template: 'Template for Annotation 3',
//         children: {
//           sessions: [6],
//         },
//       },
//       '4': {
//         id: 4,
//         name: 'Annotation 4',
//         description: 'Description for Annotation 4',
//         instructions: 'instructions for Annotation 4',
//         template: 'Template for Annotation 4',
//         children: {
//           sessions: [7, 8, 9],
//         },
//       },
//       '5': {
//         id: 5,
//         name: 'Annotation 5',
//         description: 'Description for Annotation 5',
//         instructions: 'instructions for Annotation 5',
//         template: 'Template for Annotation 5',
//         children: {
//           sessions: [10, 11, 12, 13],
//         },
//       },
//       '6': {
//         id: 6,
//         name: 'Annotation 6',
//         description: 'Description for Annotation 6',
//         instructions: 'instructions for Annotation 6',
//         template: 'Template for Annotation 6',
//         children: {
//           sessions: [14, 15, 16],
//         },
//       },
//       '7': {
//         id: 7,
//         name: 'Annotation 7',
//         description: 'Description for Annotation 7',
//         instructions: 'instructions for Annotation 7',
//         template: 'Template for Annotation 7',
//         children: {
//           sessions: [17, 18, 19],
//         },
//       },
//       '8': {
//         id: 8,
//         name: 'Annotation 8',
//         description: 'Description for Annotation 8',
//         instructions: 'instructions for Annotation 8',
//         template: 'Template for Annotation 8',
//         children: {
//           sessions: [20, 21, 22, 23],
//         },
//       },
//       '9': {
//         id: 9,
//         name: 'Annotation 9',
//         description: 'Description for Annotation 9',
//         instructions: 'instructions for Annotation 9',
//         template: 'Template for Annotation 9',
//         children: {
//           sessions: [24, 25],
//         },
//       },
//     },
//     sessions: {
//       '1': {
//         id: 1,
//         name: 'Session 1',
//         description: 'Description for Session 1',
//         children: {},
//       },
//       '2': {
//         id: 2,
//         name: 'Session 2',
//         description: 'Description for Session 2',
//         children: {},
//       },
//       '3': {
//         id: 3,
//         name: 'Session 3',
//         description: 'Description for Session 3',
//         children: {},
//       },
//       '4': {
//         id: 4,
//         name: 'Session 4',
//         description: 'Description for Session 4',
//         children: {},
//       },
//       '5': {
//         id: 5,
//         name: 'Session 5',
//         description: 'Description for Session 5',
//         children: {},
//       },
//       '6': {
//         id: 6,
//         name: 'Session 6',
//         description: 'Description for Session 6',
//         children: {},
//       },
//       '7': {
//         id: 7,
//         name: 'Session 7',
//         description: 'Description for Session 7',
//         children: {},
//       },
//       '8': {
//         id: 8,
//         name: 'Session 8',
//         description: 'Description for Session 8',
//         children: {},
//       },
//       '9': {
//         id: 9,
//         name: 'Session 9',
//         description: 'Description for Session 9',
//         children: {},
//       },
//       '10': {
//         id: 10,
//         name: 'Session 10',
//         description: 'Description for Session 10',
//         children: {},
//       },
//       '11': {
//         id: 11,
//         name: 'Session 11',
//         description: 'Description for Session 11',
//         children: {},
//       },
//       '12': {
//         id: 12,
//         name: 'Session 12',
//         description: 'Description for Session 12',
//         children: {},
//       },
//       '13': {
//         id: 13,
//         name: 'Session 13',
//         description: 'Description for Session 13',
//         children: {},
//       },
//       '14': {
//         id: 14,
//         name: 'Session 14',
//         description: 'Description for Session 14',
//         children: {},
//       },
//       '15': {
//         id: 15,
//         name: 'Session 15',
//         description: 'Description for Session 15',
//         children: {},
//       },
//       '16': {
//         id: 16,
//         name: 'Session 16',
//         description: 'Description for Session 16',
//         children: {},
//       },
//       '17': {
//         id: 17,
//         name: 'Session 17',
//         description: 'Description for Session 17',
//         children: {},
//       },
//       '18': {
//         id: 18,
//         name: 'Session 18',
//         description: 'Description for Session 18',
//         children: {},
//       },
//       '19': {
//         id: 19,
//         name: 'Session 19',
//         description: 'Description for Session 19',
//         children: {},
//       },
//       '20': {
//         id: 20,
//         name: 'Session 20',
//         description: 'Description for Session 20',
//         children: {},
//       },
//       '21': {
//         id: 21,
//         name: 'Session 21',
//         description: 'Description for Session 21',
//         children: {},
//       },
//       '22': {
//         id: 22,
//         name: 'Session 22',
//         description: 'Description for Session 22',
//         children: {},
//       },
//       '23': {
//         id: 23,
//         name: 'Session 23',
//         description: 'Description for Session 23',
//         children: {},
//       },
//       '24': {
//         id: 24,
//         name: 'Session 24',
//         description: 'Description for Session 24',
//         children: {},
//       },
//       '25': {
//         id: 25,
//         name: 'Session 25',
//         description: 'Description for Session 25',
//         children: {},
//       },
//     },
//     suites: {
//       '1': {
//         id: 1,
//         name: 'Suite 1',
//         description: 'Description for Suite 1',
//         children: {
//           cases: [1, 2],
//         },
//       },
//       '2': {
//         id: 2,
//         name: 'Suite 2',
//         description: 'Description for Suite 2',
//         children: {
//           cases: [3, 4],
//         },
//       },
//       '3': {
//         id: 3,
//         name: 'Suite 3',
//         description: 'Description for Suite 3',
//         children: {
//           cases: [5],
//         },
//       },
//       '4': {
//         id: 4,
//         name: 'Suite 4',
//         description: 'Description for Suite 4',
//         children: {
//           cases: [6, 7, 8, 9],
//         },
//       },
//       '5': {
//         id: 5,
//         name: 'Suite 5',
//         description: 'Description for Suite 5',
//         children: {
//           cases: [10],
//         },
//       },
//       '6': {
//         id: 6,
//         name: 'Suite 6',
//         description: 'Description for Suite 6',
//         children: {
//           cases: [11, 12],
//         },
//       },
//       '7': {
//         id: 7,
//         name: 'Suite 7',
//         description: 'Description for Suite 7',
//         children: {
//           cases: [13, 14],
//         },
//       },
//       '8': {
//         id: 8,
//         name: 'Suite 8',
//         description: 'Description for Suite 8',
//         children: {
//           cases: [15, 16],
//         },
//       },
//       '9': {
//         id: 9,
//         name: 'Suite 9',
//         description: 'Description for Suite 9',
//         children: {
//           cases: [17, 18, 19],
//         },
//       },
//       '10': {
//         id: 10,
//         name: 'Suite 10',
//         description: 'Description for Suite 10',
//         children: {
//           cases: [20],
//         },
//       },
//       '11': {
//         id: 11,
//         name: 'Suite 11',
//         description: 'Description for Suite 11',
//         children: {
//           cases: [21, 22],
//         },
//       },
//       '12': {
//         id: 12,
//         name: 'Suite 12',
//         description: 'Description for Suite 12',
//         children: {
//           cases: [23],
//         },
//       },
//     },
//     cases: {
//       '1': {
//         id: 1,
//         uuid: '1a4884e9-7439-45b2-9ba8-acfbc4150d18',
//         description: 'Description for Case 1',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//           {
//             query: 'Query 2',
//             expected: {
//               result: 'Expected result 2',
//             },
//           },
//           {
//             query: 'Query 3',
//             expected: {
//               result: 'Expected result 3',
//             },
//           },
//         ],
//         children: {},
//       },
//       '2': {
//         id: 2,
//         uuid: 'c27bdc48-f53a-4a2a-adb4-30a8e875c874',
//         description: 'Description for Case 2',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//         ],
//         children: {},
//       },
//       '3': {
//         id: 3,
//         uuid: 'ff4131fc-434d-4629-a941-1c16dcc2efe7',
//         description: 'Description for Case 3',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//           {
//             query: 'Query 2',
//             expected: {
//               result: 'Expected result 2',
//             },
//           },
//         ],
//         children: {},
//       },
//       '4': {
//         id: 4,
//         uuid: 'd6f6cfb0-1856-49ea-8df7-1e0295ff8497',
//         description: 'Description for Case 4',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//           {
//             query: 'Query 2',
//             expected: {
//               result: 'Expected result 2',
//             },
//           },
//         ],
//         children: {},
//       },
//       '5': {
//         id: 5,
//         uuid: 'c46f5183-126a-4315-bef5-d107b89bb551',
//         description: 'Description for Case 5',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//           {
//             query: 'Query 2',
//             expected: {
//               result: 'Expected result 2',
//             },
//           },
//           {
//             query: 'Query 3',
//             expected: {
//               result: 'Expected result 3',
//             },
//           },
//         ],
//         children: {},
//       },
//       '6': {
//         id: 6,
//         uuid: '0d1a32b0-c0f4-4250-b1d0-96d7b693ef92',
//         description: 'Description for Case 6',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//           {
//             query: 'Query 2',
//             expected: {
//               result: 'Expected result 2',
//             },
//           },
//         ],
//         children: {},
//       },
//       '7': {
//         id: 7,
//         uuid: '99606520-3811-4d7f-b05e-aaa078abdb8b',
//         description: 'Description for Case 7',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//           {
//             query: 'Query 2',
//             expected: {
//               result: 'Expected result 2',
//             },
//           },
//           {
//             query: 'Query 3',
//             expected: {
//               result: 'Expected result 3',
//             },
//           },
//           {
//             query: 'Query 4',
//             expected: {
//               result: 'Expected result 4',
//             },
//           },
//         ],
//         children: {},
//       },
//       '8': {
//         id: 8,
//         uuid: 'b24c92f4-2cbc-4f32-8f18-fcebcd5643f9',
//         description: 'Description for Case 8',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//         ],
//         children: {},
//       },
//       '9': {
//         id: 9,
//         uuid: '9244a1e5-b986-48bb-9656-33084b852229',
//         description: 'Description for Case 9',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//           {
//             query: 'Query 2',
//             expected: {
//               result: 'Expected result 2',
//             },
//           },
//         ],
//         children: {},
//       },
//       '10': {
//         id: 10,
//         uuid: '38b4dacc-d73b-454e-98ff-87b60e0a6487',
//         description: 'Description for Case 10',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//           {
//             query: 'Query 2',
//             expected: {
//               result: 'Expected result 2',
//             },
//           },
//           {
//             query: 'Query 3',
//             expected: {
//               result: 'Expected result 3',
//             },
//           },
//         ],
//         children: {},
//       },
//       '11': {
//         id: 11,
//         uuid: 'bb6ff50f-552b-4c7f-bb5e-1e807ca56132',
//         description: 'Description for Case 11',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//         ],
//         children: {},
//       },
//       '12': {
//         id: 12,
//         uuid: '68e777aa-d310-499f-a1d2-0405e01dc453',
//         description: 'Description for Case 12',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//         ],
//         children: {},
//       },
//       '13': {
//         id: 13,
//         uuid: '60a332f9-b870-47ae-8b21-f14ec91bf988',
//         description: 'Description for Case 13',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//           {
//             query: 'Query 2',
//             expected: {
//               result: 'Expected result 2',
//             },
//           },
//           {
//             query: 'Query 3',
//             expected: {
//               result: 'Expected result 3',
//             },
//           },
//           {
//             query: 'Query 4',
//             expected: {
//               result: 'Expected result 4',
//             },
//           },
//         ],
//         children: {},
//       },
//       '14': {
//         id: 14,
//         uuid: '4ac3c961-ef6c-4824-9671-a31af9f0f343',
//         description: 'Description for Case 14',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//           {
//             query: 'Query 2',
//             expected: {
//               result: 'Expected result 2',
//             },
//           },
//           {
//             query: 'Query 3',
//             expected: {
//               result: 'Expected result 3',
//             },
//           },
//           {
//             query: 'Query 4',
//             expected: {
//               result: 'Expected result 4',
//             },
//           },
//         ],
//         children: {},
//       },
//       '15': {
//         id: 15,
//         uuid: 'f6c86a87-c09a-4a45-99b5-25f4ae51b7f2',
//         description: 'Description for Case 15',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//           {
//             query: 'Query 2',
//             expected: {
//               result: 'Expected result 2',
//             },
//           },
//           {
//             query: 'Query 3',
//             expected: {
//               result: 'Expected result 3',
//             },
//           },
//         ],
//         children: {},
//       },
//       '16': {
//         id: 16,
//         uuid: '371f0cac-828d-46f9-8e95-9d4767724c65',
//         description: 'Description for Case 16',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//           {
//             query: 'Query 2',
//             expected: {
//               result: 'Expected result 2',
//             },
//           },
//           {
//             query: 'Query 3',
//             expected: {
//               result: 'Expected result 3',
//             },
//           },
//           {
//             query: 'Query 4',
//             expected: {
//               result: 'Expected result 4',
//             },
//           },
//         ],
//         children: {},
//       },
//       '17': {
//         id: 17,
//         uuid: '731f6efc-64c1-4475-9705-2291c0115d70',
//         description: 'Description for Case 17',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//           {
//             query: 'Query 2',
//             expected: {
//               result: 'Expected result 2',
//             },
//           },
//         ],
//         children: {},
//       },
//       '18': {
//         id: 18,
//         uuid: '4ceee69c-64c8-40e1-b559-5c1404cd46fc',
//         description: 'Description for Case 18',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//           {
//             query: 'Query 2',
//             expected: {
//               result: 'Expected result 2',
//             },
//           },
//           {
//             query: 'Query 3',
//             expected: {
//               result: 'Expected result 3',
//             },
//           },
//           {
//             query: 'Query 4',
//             expected: {
//               result: 'Expected result 4',
//             },
//           },
//           {
//             query: 'Query 5',
//             expected: {
//               result: 'Expected result 5',
//             },
//           },
//         ],
//         children: {},
//       },
//       '19': {
//         id: 19,
//         uuid: '9c1a98d7-e1d9-425f-9423-1575858b2531',
//         description: 'Description for Case 19',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//           {
//             query: 'Query 2',
//             expected: {
//               result: 'Expected result 2',
//             },
//           },
//         ],
//         children: {},
//       },
//       '20': {
//         id: 20,
//         uuid: '36e8d5d9-1a04-4aad-bf31-89d4403613d4',
//         description: 'Description for Case 20',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//           {
//             query: 'Query 2',
//             expected: {
//               result: 'Expected result 2',
//             },
//           },
//         ],
//         children: {},
//       },
//       '21': {
//         id: 21,
//         uuid: '3137f820-7908-49af-98d1-3082f7768c33',
//         description: 'Description for Case 21',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//         ],
//         children: {},
//       },
//       '22': {
//         id: 22,
//         uuid: '5e0ede34-8dd5-4d2d-9aaa-2739496175d7',
//         description: 'Description for Case 22',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//           {
//             query: 'Query 2',
//             expected: {
//               result: 'Expected result 2',
//             },
//           },
//         ],
//         children: {},
//       },
//       '23': {
//         id: 23,
//         uuid: '88989999-9e81-4da6-9029-f3cdf93548ec',
//         description: 'Description for Case 23',
//         keywords: [],
//         turns: [
//           {
//             query: 'Query 1',
//             expected: {
//               result: 'Expected result 1',
//             },
//           },
//         ],
//         children: {},
//       },
//     },
//     runs: {
//       '1': {
//         id: 1,
//         uuid: '59d45020-940b-46a5-82dc-c54365bc0537',
//         results: [],
//         metadata: {},
//         children: {},
//       },
//       '2': {
//         id: 2,
//         uuid: '5d00a7ea-2275-4216-a2b8-adcb419e2cbf',
//         results: [],
//         metadata: {},
//         children: {},
//       },
//       '3': {
//         id: 3,
//         uuid: '1af3b62e-671a-4229-a2bc-058152f48a11',
//         results: [],
//         metadata: {},
//         children: {},
//       },
//       '4': {
//         id: 4,
//         uuid: '92930c4a-e856-4b77-891d-cf7eae273783',
//         results: [],
//         metadata: {},
//         children: {},
//       },
//       '5': {
//         id: 5,
//         uuid: '2f2c3e06-eb54-4c34-84ff-827fd77909d4',
//         results: [],
//         metadata: {},
//         children: {},
//       },
//       '6': {
//         id: 6,
//         uuid: 'fe400b39-9342-4a62-957b-2d158f78218b',
//         results: [],
//         metadata: {},
//         children: {},
//       },
//       '7': {
//         id: 7,
//         uuid: 'e6ab0f72-b7bb-42aa-9a28-ff1fbb2c79db',
//         results: [],
//         metadata: {},
//         children: {},
//       },
//       '8': {
//         id: 8,
//         uuid: '1adf2e01-2ee2-4104-b31d-7c188ac2d013',
//         results: [],
//         metadata: {},
//         children: {},
//       },
//       '9': {
//         id: 9,
//         uuid: 'edf612c2-8244-4bfd-84bc-ca20c9bc1f60',
//         results: [],
//         metadata: {},
//         children: {},
//       },
//     },
//   },
// };
