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
                    id: 11,
                    type: 'Case',
                    name: 'Description for Case 11',
                    description: 'bb6ff50f-552b-4c7f-bb5e-1e807ca56132',
                    children: {},
                  },
                  {
                    id: 12,
                    type: 'Case',
                    name: 'Description for Case 12',
                    description: '68e777aa-d310-499f-a1d2-0405e01dc453',
                    children: {},
                  },
                ],
              },
            },
          ],
          annotations: [
            {
              id: 4,
              type: 'Annotation',
              name: 'Annotation 4',
              description: 'Description for Annotation 4',
              children: {},
            },
            {
              id: 5,
              type: 'Annotation',
              name: 'Annotation 5',
              description: 'Description for Annotation 5',
              children: {},
            },
          ],
          runs: [
            {
              id: 2,
              type: 'Run',
              name: '5d00a7ea-2275-4216-a2b8-adcb419e2cbf',
              description: 'Run 2',
              children: {},
            },
            {
              id: 3,
              type: 'Run',
              name: '1af3b62e-671a-4229-a2bc-058152f48a11',
              description: 'Run 3',
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
      {
        id: 4,
        type: 'Project',
        name: 'Project 4',
        description: 'Description for Project 4',
        children: {},
      },
    ],
  },
};

export const tree3: TreeNode = {
  "id": 0,
  "type": "root",
  "name": "root",
  "description": "root",
  "children": {
    "projects": [
      {
        "id": 1,
        "type": "projects",
        "children": {},
        "name": "Project 1",
        "description": "Description for Project 1"
      },
      {
        "id": 2,
        "type": "projects",
        "children": {
          "suites": [
            {
              "id": 4,
              "type": "suites",
              "children": {},
              "name": "Suite 4",
              "description": "Description for Suite 4"
            },
            {
              "id": 5,
              "type": "suites",
              "children": {},
              "name": "Suite 5",
              "description": "Description for Suite 5"
            },
            {
              "id": 6,
              "type": "suites",
              "children": {
                "cases": [
                  {
                    "id": 11,
                    "type": "cases",
                    "children": {},
                    "name": "Description for Case 11",
                    "description": "b9615385-02f2-4631-a95b-ca379212bc21"
                  },
                  {
                    "id": 12,
                    "type": "cases",
                    "children": {},
                    "name": "Description for Case 12",
                    "description": "0e8ddb6a-ed1b-49c6-a544-2f48070e4c01"
                  }
                ]
              },
              "name": "Suite 6",
              "description": "Description for Suite 6"
            }
          ],
          "annotations": [
            {
              "id": 4,
              "type": "annotations",
              "children": {},
              "name": "Annotation 4",
              "description": "Description for Annotation 4"
            },
            {
              "id": 5,
              "type": "annotations",
              "children": {},
              "name": "Annotation 5",
              "description": "Description for Annotation 5"
            }
          ],
          "runs": [
            {
              "id": 2,
              "type": "runs",
              "children": {},
              "name": "f51bcc85-f700-464f-8aba-bab2431d5735",
              "description": "2"
            },
            {
              "id": 3,
              "type": "runs",
              "children": {},
              "name": "ccf34573-9a5d-4086-80de-284a761c15d6",
              "description": "3"
            }
          ]
        },
        "name": "Project 2",
        "description": "Description for Project 2"
      },
      {
        "id": 3,
        "type": "projects",
        "children": {},
        "name": "Project 3",
        "description": "Description for Project 3"
      },
      {
        "id": 4,
        "type": "projects",
        "children": {},
        "name": "Project 4",
        "description": "Description for Project 4"
      }
    ]
  }
}
