const cases = [
  {
    uuid: '0e67dc5f-5797-4583-b65e-2d39746dd614',
    keywords: ['single-turn', 'meal', 'p0'],
    turns: [
      {
        query: 'a large wiseguy meal with coke',
        expected: {
          items: [
            {
              name: 'Wiseguy Meal',
              size: 'Large',
              sandwich: 'CHOOSE',
              fries: 'CHOOSE',
              drink: {
                name: 'Coca-Cola',
                size: 'Large',
              },
            },
          ],
        },
      },
    ],
  },
  {
    uuid: 'c47c6a7c-d819-4d71-a87b-a5c85ba5f765',
    keywords: ['multi-turn', 'combo', 'p1'],
    turns: [
      {
        query: 'can I get a cheeseburger twofer',
        expected: {
          items: [
            {
              name: 'Twofer Combo',
              one: {
                name: 'Bacon Cheeseburger',
              },
              two: 'CHOOSE',
            },
          ],
        },
      },
      {
        query: 'can I get that with extra ketchup and a sprite',
        expected: {
          items: [
            {
              name: 'Twofer Combo',
              one: {
                name: 'Bacon Cheeseburger',
                options: [
                  {
                    name: 'Ketchup',
                    amount: 'Extra',
                  },
                ],
              },
              two: {
                name: 'Sprite',
                size: 'Medium',
              },
            },
          ],
        },
      },
    ],
  },
  {
    uuid: '894206bb-923d-43a3-922a-7f909648fc2b',
    keywords: ['single-turn', 'edit', 'p1'],
    turns: [
      {
        query: 'i want a a grilled chicken and a fish burger and two cokes',
        expected: {
          items: [
            {
              name: 'Grilled Chicken Sandwich',
            },
            {
              name: 'Captain Nemo Burger',
            },
            {
              name: 'Coca-Cola',
              size: 'CHOOSE',
            },
            {
              name: 'Coca-Cola',
              size: 'CHOOSE',
            },
          ],
        },
      },
    ],
  },
  {
    uuid: 'adf6d0b5-e06c-4f33-a735-338918f10f51',
    keywords: ['multi-turn', 'edit', 'p2'],
    turns: [
      {
        query: 'i want a a grilled chicken and a fish burger and two cokes',
        expected: {
          items: [
            {
              name: 'Grilled Chicken Sandwich',
            },
            {
              name: 'Captain Nemo Burger',
            },
            {
              name: 'Coca-Cola',
              size: 'CHOOSE',
            },
            {
              name: 'Coca-Cola',
              size: 'CHOOSE',
            },
          ],
        },
      },
      {
        query: 'add bacon and extra mayo the chicken and 86 the fish',
        expected: {
          items: [
            {
              name: 'Grilled Chicken Sandwich',
              options: [
                {
                  name: 'Bacon',
                  amount: 'Regular',
                },
                {
                  name: 'Mayo',
                  amount: 'Extra',
                },
              ],
            },
            {
              name: 'Coca-Cola',
              size: 'CHOOSE',
            },
            {
              name: 'Coca-Cola',
              size: 'CHOOSE',
            },
          ],
        },
      },
    ],
  },
  {
    uuid: 'cff84b6a-1ac2-41c0-a524-59c426f09201',
    turns: [
      {
        query: 'can I a double wiseguy with no tomatoes and extra mayo',
        expected: {
          items: [
            {
              name: 'Double Wiseguy',
              type: 'CHOOSE',
            },
          ],
        },
      },
    ],
  },
];

export const suite = {
  uuid: '764a9e7f-738d-4466-beca-313749ece90e',
  name: 'Sample suite',
  description: 'This is a sample test suite for validating order flows.',
  cases,
};
