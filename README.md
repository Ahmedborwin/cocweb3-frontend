# Valor V1


Introducing "Valor," an exhilarating blockchain military game where players embark on daring raids to conquer enemies and seize victory. Engage in intense battles, strategize your moves, and unleash your skills to raid enemy strongholds. Success in raids rewards players with experience points (XP) and coveted loot in the form of unique non-fungible tokens (NFTs). These NFTs represent powerful equipment and weapons, each possessing distinct properties that enhance your chances in both raids and epic Boss Fights. As your XP grows, your rank ascends, unlocking access to more challenging raid missions and formidable Boss Fights that demand tactical brilliance. In the world of Valor, players must prove their mettle, gain XP, collect rare NFT loot, and rise through the ranks to become legendary warriors. Are you ready to forge your path and etch your name in the annals of Valor?


## Table of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Improvements for V2](#Improvements-for-V2)
* [Learning Needed](#Learning-Needed)


## About the Project


I'm working on a game to apply my knowledge of blockchain and front-end development. The objective is to continually learn new concepts and enhance my programming skills with each game version. I'm exploring the potential of blockchain technology, using Next.js for the front-end and Solidity for the back-end. Additionally, I'm utilizing Moralis as an API provider to streamline development. However, I'm also researching different frameworks for future iterations. I'm particularly interested in exploring Svelte for front-end development. By leveraging these technologies, I aim to create engaging user interfaces, improve user experience, and integrate blockchain features seamlessly. With each iteration, I'll demonstrate my growth as a programmer and adapt my tech stack to align with evolving industry trends and personal interest


## Built With

* Next.js for front end
* Solidity as the Smart Contract Programming Language
* Moralis as the Web3 API provider


## Improvements for V2 (May take a V3 to implement all of these ideas)

### Extra Features to add to the game

* Rank NFT
* Loot NFT to be won randomnly through raiding. NFT to posses unique properties
* 2 and 3 Riad levels
* Boss Fight. Turn based game to try and take out the boss
* Raid entry price is through token
* Earn tokens through Boss Battles
* decrease gas cost of the game and function calls
* Deploy to a layer 2 network to decrease cost of gas. 
* 


### Design amendements for the front end

* component to Connect to CoCWeb3 contract then export out data/moralis contract functions to other components
* players details component. Component such as RookieRaid with connection to contract can make the call then pass playerinfo to componenet to render player stats. Couldnt get this to work for me
* Handle Reverts and notify player of revert reason. How can i access the revert reason from app? or do i have to use events for all custom errors?
* Improve UI and UX. Build better NAV bar, Player stats menu and notification prompts. Improve speed of page loading.
* Build armory page that will display all the game NFTs player currently posses. 


## Learning Needed

 * study the component lifecycles and get better at using useEffect hooks to trigger functions/update UI
 * Practise tailwind css 
 * learn to use notification libraries better such as web3uikit and tailwinds own notification options
 * learn more about gas pricing and how to decrease gas costs
 * Learn more about matic and starknet
 * Learn about account abstraction and how i can utlise this to improve UX in game.  




