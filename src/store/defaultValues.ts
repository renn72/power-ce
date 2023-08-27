import { getRandomInt, } from '~/utils/utils'

export const defaultValues = {
  name: `block-${getRandomInt(1000)}`,
  week: [
    {
      name: '',
      isTemplate: false,
      day: [
        {
          isRestDay: true,
          exercise: [],
        },
        {
          isRestDay: true,
          exercise: [],
        },
        {
          isRestDay: true,
          exercise: [],
        },
        {
          isRestDay: true,
          exercise: [],
        },
        {
          isRestDay: true,
          exercise: [],
        },
        {
          isRestDay: true,
          exercise: [],
        },
        {
          isRestDay: true,
          exercise: [],
        },
      ],
    },
  ],
}

export const defaultLifts = [
  'squat',
  'bench',
  'deadlift',
  'front squat',
  'deficit deadlift',
  'pause squat',
  'pause front squat',
  'close grip bench',
  'saftety bar squat',
  'paused deficit deadlift',
  'paused deadlift',
  'spoto press',
  'larsen press',
  'tempo bench',
  'tempo squat',
  'tempo deadlift',
  'stiffbar deadlift',
]

export const rpe = [
  [
    100.00,
    95.50,
    92.20,
    89.20,
    86.30,
    83.70,
    81.10,
    78.60,
    76.20,
    73.90,
    70.70,
    68.00,
  ],
  [
    97.80,
    93.90,
    90.70,
    87.80,
    85.00,
    82.40,
    79.90,
    77.40,
    75.10,
    72.30,
    69.40,
    66.70,
  ],
  [
    95.50,
    92.20,
    89.20,
    86.30,
    83.70,
    81.10,
    78.60,
    76.20,
    73.90,
    70.70,
    68.00,
    65.30,
  ],
  [
    93.90,
    90.70,
    87.80,
    85.00,
    82.40,
    79.90,
    77.40,
    75.10,
    72.30,
    69.40,
    66.70,
    64.00,
  ],
  [
    92.90,
    89.20,
    86.30,
    83.70,
    81.10,
    78.60,
    76.20,
    73.90,
    70.70,
    68.00,
    65.30,
    62.60,
  ],
  [
    90.70,
    87.80,
    85.00,
    82.40,
    79.90,
    77.40,
    75.10,
    72.30,
    69.40,
    66.70,
    64.00,
    61.30,
  ],
  [
    89.20,
    86.30,
    83.70,
    81.10,
    78.60,
    76.20,
    73.90,
    70.70,
    68.00,
    65.30,
    62.60,
    59.90,
  ],
  [
    87.80,
    85.00,
    82.40,
    79.90,
    77.40,
    75.10,
    72.30,
    69.40,
    66.70,
    64.00,
    61.30,
    58.60,
  ],
  [
    86.30,
    83.70,
    81.10,
    78.60,
    76.20,
    73.90,
    70.70,
    68.00,
    65.30,
    62.60,
    59.90,
    57.40,
  ],
]

export const testBlock = {
  'name': `gen-${getRandomInt(1000)}`,
  'id': '',
  'isProgram': false,
  'week': [
    {
      'name': 'test-template',
      'isTemplate': false,
      'day': [
        {
          'isRestDay': false,
          'exercise': [
            {
              'name': 'Heavy Squat',
              'lift': 'squat',
              'onerm': 86,
              'onermTop': 90,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 1,
              'reps': 1,
              'notes': '1rm test',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': 'onerm',
              'repUnit': '',
            },
            {
              'name': 'Deload Squat',
              'lift': 'squat',
              'onerm': 70,
              'onermTop': 75,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 6,
              'reps': 6,
              'notes': 'onec ac odio tempor orci. Aenean euismod elementum nisi quis eleifend q',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': 1,
              'weightType': 'onerm',
              'repUnit': '',
            },
            {
              'name': 'Deficit Deadlift',
              'lift': 'deficit deadlift',
              'onerm': 90,
              'onermTop': 99,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': 8,
              'sets': 1,
              'reps': 2,
              'notes': 'por orci. Nunc sed augue lacus viverra. Sit amet nisl purus in mollis nunc sed id semper. Sollicitudin nibh sit amet commodo nulla facilisi nulla',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': 'rpe',
              'repUnit': '',
            },
            {
              'name': 'Deficit Deadlift',
              'lift': 'deficit deadlift',
              'onerm': 66,
              'onermTop': 70,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 8,
              'reps': 8,
              'notes': '',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': 3,
              'weightType': 'onerm',
              'repUnit': '',
            },
            {
              'name': 'run',
              'lift': 'unlinked',
              'onerm': null,
              'onermTop': null,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 4,
              'reps': 100,
              'notes': 'run repeats',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': null,
              'repUnit': 'meters',
            },
            {
              'name': 'Plank',
              'lift': 'unlinked',
              'onerm': null,
              'onermTop': null,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 5,
              'reps': 30,
              'notes': 'planky planky planky',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': null,
              'repUnit': 'sec',
            },
          ],
        },
        {
          'isRestDay': false,
          'exercise': [
            {
              'name': 'Heavy Squat',
              'lift': 'squat',
              'onerm': 86,
              'onermTop': 90,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 1,
              'reps': 1,
              'notes': '1rm test',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': 'onerm',
              'repUnit': '',
            },
            {
              'name': 'Deload Squat',
              'lift': 'squat',
              'onerm': 70,
              'onermTop': 75,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 6,
              'reps': 6,
              'notes': 'onec ac odio tempor orci. Aenean euismod elementum nisi quis eleifend q',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': 1,
              'weightType': 'onerm',
              'repUnit': '',
            },
            {
              'name': 'Deficit Deadlift',
              'lift': 'deficit deadlift',
              'onerm': 90,
              'onermTop': 99,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': 8,
              'sets': 1,
              'reps': 2,
              'notes': 'por orci. Nunc sed augue lacus viverra. Sit amet nisl purus in mollis nunc sed id semper. Sollicitudin nibh sit amet commodo nulla facilisi nulla',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': 'rpe',
              'repUnit': '',
            },
            {
              'name': 'Deficit Deadlift',
              'lift': 'deficit deadlift',
              'onerm': 66,
              'onermTop': 70,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 8,
              'reps': 8,
              'notes': '',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': 3,
              'weightType': 'onerm',
              'repUnit': '',
            },
            {
              'name': 'run',
              'lift': 'unlinked',
              'onerm': null,
              'onermTop': null,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 4,
              'reps': 100,
              'notes': 'run repeats',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': null,
              'repUnit': 'meters',
            },
            {
              'name': 'Plank',
              'lift': 'unlinked',
              'onerm': null,
              'onermTop': null,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 5,
              'reps': 30,
              'notes': 'planky planky planky',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': null,
              'repUnit': 'sec',
            },
          ],
        },
        {
          'isRestDay': false,
          'exercise': [
            {
              'name': 'Heavy Squat',
              'lift': 'squat',
              'onerm': 86,
              'onermTop': 90,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 1,
              'reps': 1,
              'notes': '1rm test',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': 'onerm',
              'repUnit': '',
            },
            {
              'name': 'Deload Squat',
              'lift': 'squat',
              'onerm': 70,
              'onermTop': 75,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 6,
              'reps': 6,
              'notes': 'onec ac odio tempor orci. Aenean euismod elementum nisi quis eleifend q',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': 1,
              'weightType': 'onerm',
              'repUnit': '',
            },
            {
              'name': 'Deficit Deadlift',
              'lift': 'deficit deadlift',
              'onerm': 90,
              'onermTop': 99,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': 8,
              'sets': 1,
              'reps': 2,
              'notes': 'por orci. Nunc sed augue lacus viverra. Sit amet nisl purus in mollis nunc sed id semper. Sollicitudin nibh sit amet commodo nulla facilisi nulla',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': 'rpe',
              'repUnit': '',
            },
            {
              'name': 'Deficit Deadlift',
              'lift': 'deficit deadlift',
              'onerm': 66,
              'onermTop': 70,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 8,
              'reps': 8,
              'notes': '',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': 3,
              'weightType': 'onerm',
              'repUnit': '',
            },
            {
              'name': 'run',
              'lift': 'unlinked',
              'onerm': null,
              'onermTop': null,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 4,
              'reps': 100,
              'notes': 'run repeats',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': null,
              'repUnit': 'meters',
            },
            {
              'name': 'Plank',
              'lift': 'unlinked',
              'onerm': null,
              'onermTop': null,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 5,
              'reps': 30,
              'notes': 'planky planky planky',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': null,
              'repUnit': 'sec',
            },
          ],
        },
        {
          'isRestDay': true,
          'exercise': [],
        },
        {
          'isRestDay': false,
          'exercise': [
            {
              'name': 'Heavy Squat',
              'lift': 'squat',
              'onerm': 86,
              'onermTop': 90,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 1,
              'reps': 1,
              'notes': '1rm test',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': 'onerm',
              'repUnit': '',
            },
            {
              'name': 'Deload Squat',
              'lift': 'squat',
              'onerm': 70,
              'onermTop': 75,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 6,
              'reps': 6,
              'notes': 'onec ac odio tempor orci. Aenean euismod elementum nisi quis eleifend q',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': 1,
              'weightType': 'onerm',
              'repUnit': '',
            },
            {
              'name': 'Deficit Deadlift',
              'lift': 'deficit deadlift',
              'onerm': 90,
              'onermTop': 99,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': 8,
              'sets': 1,
              'reps': 2,
              'notes': 'por orci. Nunc sed augue lacus viverra. Sit amet nisl purus in mollis nunc sed id semper. Sollicitudin nibh sit amet commodo nulla facilisi nulla',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': 'rpe',
              'repUnit': '',
            },
            {
              'name': 'Deficit Deadlift',
              'lift': 'deficit deadlift',
              'onerm': 66,
              'onermTop': 70,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 8,
              'reps': 8,
              'notes': '',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': 3,
              'weightType': 'onerm',
              'repUnit': '',
            },
            {
              'name': 'run',
              'lift': 'unlinked',
              'onerm': null,
              'onermTop': null,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 4,
              'reps': 100,
              'notes': 'run repeats',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': null,
              'repUnit': 'meters',
            },
            {
              'name': 'Plank',
              'lift': 'unlinked',
              'onerm': null,
              'onermTop': null,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 5,
              'reps': 30,
              'notes': 'planky planky planky',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': null,
              'repUnit': 'sec',
            },
          ],
        },
        {
          'isRestDay': false,
          'exercise': [
            {
              'name': 'Heavy Squat',
              'lift': 'squat',
              'onerm': 86,
              'onermTop': 90,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 1,
              'reps': 1,
              'notes': '1rm test',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': 'onerm',
              'repUnit': '',
            },
            {
              'name': 'Deload Squat',
              'lift': 'squat',
              'onerm': 70,
              'onermTop': 75,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 6,
              'reps': 6,
              'notes': 'onec ac odio tempor orci. Aenean euismod elementum nisi quis eleifend q',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': 1,
              'weightType': 'onerm',
              'repUnit': '',
            },
            {
              'name': 'Deficit Deadlift',
              'lift': 'deficit deadlift',
              'onerm': 90,
              'onermTop': 99,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': 8,
              'sets': 1,
              'reps': 2,
              'notes': 'por orci. Nunc sed augue lacus viverra. Sit amet nisl purus in mollis nunc sed id semper. Sollicitudin nibh sit amet commodo nulla facilisi nulla',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': 'rpe',
              'repUnit': '',
            },
            {
              'name': 'Deficit Deadlift',
              'lift': 'deficit deadlift',
              'onerm': 66,
              'onermTop': 70,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 8,
              'reps': 8,
              'notes': '',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': 3,
              'weightType': 'onerm',
              'repUnit': '',
            },
            {
              'name': 'run',
              'lift': 'unlinked',
              'onerm': null,
              'onermTop': null,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 4,
              'reps': 100,
              'notes': 'run repeats',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': null,
              'repUnit': 'meters',
            },
            {
              'name': 'Plank',
              'lift': 'unlinked',
              'onerm': null,
              'onermTop': null,
              'weightTop': null,
              'weightBottom': null,
              'targetRpe': null,
              'sets': 5,
              'reps': 30,
              'notes': 'planky planky planky',
              'isEstimatedOnerm': false,
              'estimatedOnermIndex': null,
              'weightType': null,
              'repUnit': 'sec',
            },
          ],
        },
        {
          'isRestDay': true,
          'exercise': [],
        },
      ],
    },
  ],
}
