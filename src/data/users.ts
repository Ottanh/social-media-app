const users = [
  {
    'username': 'olli111',
    'name': 'Olli',
    'joined': '13/05/2022',
    'description': 'moooi oon olli ja tää on mun description ja *********',
    'posts': [
      {
        'id': 'postid1',
        'user': {
          'name': 'Olli'
        },
        'date': '13/05/2022',
        'content': 'Eka postaus',
        'likes': 6
      },
      {
        'id': 'postid2',
        'user': {
          'name': 'Olli'
        },
        'date': '13/05/2022',
        'content': 'Toinen postaus',
        'likes': 1
      }
    ]
  },
  {
    'username': 'john420',
    'name': 'John',
    'joined': '17/05/2022',
    'description': 'nobel voittaja 2025',
    'posts': [
      {
        'id': 'postid1',
        'user': {
          'name': 'John'
        },
        'date': '17/05/2022',
        'content': 'Moi mozzi',
        'likes': 2
      },
      {
        'id': 'postid2',
        'user': {
          'name': 'John'
        },
        'date': '17/05/2022',
        'content': 'Tähdet jännässä asennossa tänään',
        'likes': 1
      }
    ]
  }
];

export default users;