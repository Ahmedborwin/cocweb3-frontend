# Code of Conflict Front End


Welcome to "Starfire Assault," an adrenaline-pumping online military game that will immerse you in intense raid missions. Engage in strategic warfare, earning XP to level up and unlock new challenges. But here's the twist: each successful raid grants you random loot, in the form of valuable Non-Fungible Tokens (NFTs). These NFTs represent unique weapons, vehicles, and equipment, each providing specific utilities and advantages. Smart utilization of these NFTs will enhance your chances of success in future raids. Form alliances, customize your loadouts, and conquer enemy territories. Join the ranks of elite players and dominate the battlefield in Starfire Assault!



# CoCWeb3 Front End
- [X]login
- [X]Create new player
- []Raid page 

## Front End To Do List:
- [X] New Nextjs project

- [] Home Page
    - [X] log in button using Web3uikit and moralis  
    - [X] Create New player button
    - [X] Player details only renders if address recognised
    - [X] Main Menu screen when address recognised
    - [X] button to direct to raid URL screen/path
    - [X] event, notifications and auto UI update
        -[] New player created
        -[] raid succesfull
        -[] raid unsuccessfull



- [X] Player Details card
    - [X] get players details from contract
    - [X] format the players details
        - [X] Player rank should be based on miltary ranking
        - [X] grid to display player Info

- [X] Add nav bar with buttons:
    - [X] Home 
    - [X] Armory
    - [X] About game
    - [X] Developer portfolio page

- [] Raid Screens
    - [] Rookie Raid
    - [] Expert Raid
    - [] Team Raid

- [] Raid Level 1 Page

    - [X] Check if address connected to a username if not button to go back to home page)
    - [X] create images using AI and add to Raid Page
    - [] getPlayer call to complete before trying to render the player. 
        //Unable to replecate this issue
    - [X] Button to raid





### Design amendements

- [] component to Connect to CoCWeb3 contract then export out data/moralis contract functions to other components
- [] players details component. Component such as RookieRaid with connection to contract can make the call then pass playerinfo to componenet to render player stats. Couldnt get this to work for me
- [] Handle Reverts and notify player of revert reason. How can i access the revert reason from app? or do i have to use events for all custom errors?

### Learning excercises

 - [] study the component lifecycles and get better at using useEffect hooks to trigger functions/update UI
 - [] Practise tailwind css 
 - [] learn to use notification libraries better such as web3uikit and tailwinds own notification options
 - []



