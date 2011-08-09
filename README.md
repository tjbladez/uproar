       _   _
      | | | |
      | | | |_ __  _ __ ___   __ _ _ __
      | | | | '_ \| '__/ _ \ / _` | '__|
      | |_| | |_) | | | (_) | (_| | |
       \___/| .__/|_|  \___/ \__,_|_|
            | |
            |_|

## Uproar ##

Your call for noise

Uproar is [Express.js](http://expressjs.com/) app that utilizes [Impact.js](http://impactjs.com/) and [Faye](http://faye.jcoglan.com/)
to allow broadcasts of requested sound across all participating clients.

### How does it work ###

* Launch a server
* Any client that chooses to participate opens up a website which will create a faye client and will listen to
server messages
* Any posts to `/play` with sound argument will notify each client to play requested sound

### Todo ###

* File management: search, add, remove sounds to play
* Add speak.js support