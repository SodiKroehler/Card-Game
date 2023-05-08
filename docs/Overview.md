# Card Game Overview

## v0.1 - May 2022

### High Level

- Name: Canceled
- Platforms: Web Only
- Main Purpose: To make really really good captcha checks
- Secondary Purpose: To provide video-based online parties

### Parts

- React Frontend
-- Homescreen
-- Login
-- Selector
-- Capture
- Back End
-- User Management
-- GIF Storage
-- API
--- Client API
--- AI API


### Units

#### Player

- home
- dialog
-- .timer
-- .fields
-- registration
-- login
-- game_picker
- picker
-- glass_picker
-- rank_picker

#### THESEUS

- glass_data
- (glass_mech)anics
- prompts
- user_data
- (user_pref)erences
- log
-- riddle_data
-- glass_data
-- rank_data

#### Hub

- server
- auth


### Workflow

#### Registration/Initial Login

User enters email; `player` asks THESEUS for token 

- On `no_email_found`: open `registration` with option to return
- On success: send THESEUS riddle and user_name, open `login`

#### Full Login

- send `login` data to THESEUS
- respond with JWT token, advance player to `room_picker`

#### Open Room

- send results of `room_picker` to HUB
- add player to chosen `room`
-- if failure, advance player back to `room-picker`
- advance player to `home`
- open videos

#### Start Game

- request `prompt` from THESEUS
- display prompt, advance all room players to `glass_picker`
- generate `num_players_in_room` requests of `glass_set` from THESEUS, load `sheen` with promises
- on `glass_picker` completion, send results to HUB and THESEUS
- on `num_glass_picker = num_players_in_room`, send `room_glassware` to all in room
- advance all room players to `rank_picker`
- post all `rank_picker_data` to HUB and THESEUS, advance all room players to `home`
- get `winner`, display `winner_dialog`
- get updated `player_data`

### TODO:

- get authorization working /doneithink
- get video working
- set up THESEUS / done i think
- finish up react


### STRUCTURE

As of 5/26: spa with microservice structure?
SPHINX handles auth, THESEUS handles data, HECTOR handles client, HERMES handles rtc

Need to be able to scroll videos 
- save
- "refresh"
- different

need to determine "ethics level" - should be able to set certain lines, but also learn based on different 
maybe get rid of prompts - have to give a gif and everyone send better 