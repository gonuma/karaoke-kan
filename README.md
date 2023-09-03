# karaoke-kan

I hope you like karaoke parties...

WIP
To get this party started, open up 3 terminals, and run the following in each:
In /karaoke_kan/server: node index.js
In /karaoke_kan/host-server: npm run start
In /karaoke_kan: npm run start


To Do:
1) Implement a database for holding songs/queues
   - MongoDB Atlas?
2) Implement YouTube API functionality to React Native controller to allow phone users to search for songs and push to database
3) Add MongoDB searching to the Web Player frontend, to play next song in the database when first finishes
4) Add skip functionality to React Native controller
5) Limit React Native Controller input to only search for karaoke videos
6) Add microphone audio input/passthrough
7) Add vocal analysis (Big end goal) 
