export const templateConfigs = {
  birthday: {
    slides: [
      { type: 'intro', title: 'Today is Special', subtitle: 'because you were born', layout: 'center' },
      { type: 'name', title: 'Happy Birthday', content: 'recipientName', layout: 'center' },
      { type: 'photo1', title: 'Look at this beautiful soul', subtitle: 'Every smile tells a story of joy and love', layout: 'center' },
      { type: 'heartfelt', title: 'You bring joy to everyone around you', subtitle: 'Your smile lights up the world', layout: 'center' },
      { type: 'photo2', title: 'Another precious moment', subtitle: 'Memories like these make life beautiful', layout: 'center' },
      { type: 'grateful', title: 'We are so grateful for you', subtitle: 'Thank you for being amazing', layout: 'center' },
      { type: 'age', title: 'Another Year of Wonderful You', content: 'amount', layout: 'center' },
      { type: 'wish', title: 'Special Wish For You', content: 'message', layout: 'center' },
      { type: 'finale', title: 'Make a Wish', subtitle: 'May all your dreams come true', layout: 'center' }
    ],
    lottieAsset: '/assets/lottie/birthday.json',
    accent: '#fdf9f9ff',
    music: '/audio/birthday.mp3'
  },
  wedding: {
    slides: [
      { type: 'intro', title: 'Love Story Begins', subtitle: 'two hearts become one', layout: 'center' },
      { type: 'name', title: 'Congratulations', content: 'recipientName', layout: 'center' },
      { type: 'photo1', title: 'A perfect match made in heaven', subtitle: 'Your love shines brighter than any star', layout: 'center' },
      { type: 'heartfelt', title: 'May your love grow stronger each day', subtitle: 'Together you are unstoppable', layout: 'center' },
      { type: 'photo2', title: 'Forever starts today', subtitle: 'Two souls united in perfect harmony', layout: 'center' },
      { type: 'grateful', title: 'Wishing you endless happiness', subtitle: 'May your marriage be filled with joy', layout: 'center' },
      { type: 'wish', title: 'Special Wishes For You Both', content: 'message', layout: 'center' },
      { type: 'finale', title: 'Happily Ever After', subtitle: 'May your love story never end', layout: 'center' }
    ],
    lottieAsset: '/assets/lottie/bg-wedding.json',
    backgroundLottie: true,
    accent: '#000000',
    music: '/audio/wedding.mp3'
  },
  anniversary: {
    slides: [
      { type: 'intro', title: 'Love Continues', subtitle: 'celebrating your beautiful journey', layout: 'center' },
      { type: 'name', title: 'Happy Anniversary', content: 'recipientName', layout: 'center' },
      { type: 'photo1', title: 'Your love story inspires us all', subtitle: 'Every day together is a blessing', layout: 'center' },
      { type: 'heartfelt', title: 'Through all seasons of life', subtitle: 'Your love remains constant and true', layout: 'center' },
      { type: 'photo2', title: 'Growing stronger together', subtitle: 'Love that deepens with every passing day', layout: 'center' },
      { type: 'grateful', title: 'Celebrating your commitment', subtitle: 'A love that stands the test of time', layout: 'center' },
      { type: 'duration', title: 'Together For', content: 'amount', layout: 'center' },
      { type: 'wish', title: 'Anniversary Wishes', content: 'message', layout: 'center' },
      { type: 'finale', title: 'Here\'s To Many More', subtitle: 'May your love story continue forever', layout: 'center' }
    ],
    lottieAsset: '/assets/lottie/love.json',
    accent: '#000000',
    music: '/audio/romantic.mp3'
  },
  graduation: {
    slides: [
      { type: 'intro', title: 'Achievement', subtitle: 'unlocked successfully', layout: 'center' },
      { type: 'name', title: 'Congratulations', content: 'recipientName', layout: 'center' },
      { type: 'photo', title: 'Future Leader', subtitle: 'Ready to conquer the world', layout: 'center' },
      { type: 'heartfelt', title: 'Your hard work has paid off', subtitle: 'This is just the beginning of your success', layout: 'center' },
      { type: 'grateful', title: 'We are so proud of you', subtitle: 'Your dedication inspires us all', layout: 'center' },
      { type: 'message', title: 'Special Message', content: 'message', layout: 'center' },
      { type: 'finale', title: 'Well Done', subtitle: 'The future awaits you', layout: 'center' }
    ],
    lottieAsset: '/assets/lottie/graduation.json',
    accent: '#000000',
    music: '/audio/celebration.mp3'
  }
}