# VocabVault
### A better way to learn vocab

For years, flashcard learning apps have been ripping students off by charging for basic features like Laern Mode, shoving AI companions down our throats, and riddling their websites with ads and account requirements. Students are looking for a website that helps them learn vocab with nothing more and nothing less. VocabVault does just that.

VocabVault enables anyone to create a flashcard set in four different languages: English, German, French, and Spanish. There are no account requirements to create a set; instead each set has a unique URL that anyone can access. In each set, there are three primary features: learn mode, write mode, and flashcards.
1. **Learn Mode**
- This feature has helps you learn a vocab set that's completey unfamiliar to you. It does this by ranking your knowledge of the vocab on a numerical scale based on your performance. Based on this ranking, it will either present a recognition prompt (multple choice), definition prompt (self graded free response), or writing prompt (free response that checks spelling). Your progress is tracked through a progress bar with each tab's color representing your progress on that particular vocab word.
2. **Write Mode**
- This feature helps you learn to spell a vocab set. You're provided the definition of each word, and it grades how you spell the word that goes with the definition. Each round, you go through the entire set of words that you have yet to spell correctly.
3. **Flashcards**
- This is the more traditional method of learning vocabulary replicated on the computer. You can flip the flashcard between the definition and the word to quiz yourself in your head.

This project is built upon the Next.js pages router. The backend data is stored in a Prisma SQL database. I set up a `GET` and `POST` API route to fetch and submit data from the database. The cards submission page and API route is protected by a Cloudflare CAPTCHA. 

I'm open to any contributions you'd like to make. The early stages of the project was pretty rough, as I was learning how to use the Next.js architecture for the first time. Later on though, I think the code gets much cleaner.
