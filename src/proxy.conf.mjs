export default [
  {
    context: [
      '/my',
      '/many',
      '/endpoints',
      '/i',
      '/need',
      '/to',
      '/proxy'
    ],
    target: 'http://localhost:8000',
    secure: false
  }
];
