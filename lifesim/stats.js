const saveStat = (stat, value) => localStorage.setItem(stat, JSON.stringify(value));
const loadStat = stat => JSON.parse(localStorage.getItem(stat));
const deleteStat = stat => localStorage.removeItem(stat);
function deleteData() {
    deleteStat("money");
    deleteStat("people");
    deleteStat("food");
    deleteStat("interiors");
    deleteStat("last-update");
}
function getProblem() {
    const people = loadStat("people");
    const problems = [
        "hungry", "hungry", "hungry",
        "interior", "interior",
        "friend", "friend", "friend",
        "love"
    ]; // multiple of the same to change the odds (can prob do this a better way)
    const chosenPerson = people[Math.floor(Math.random() * people.length)]; // get random person to give problem to
    const chosenProblem = problems[Math.floor(Math.random() * problems.length)]; // get random problem to give to that random person
    if (!chosenPerson.problem) {
        chosenPerson.problem = chosenProblem;
        console.log(`made ${chosenPerson.nickname} ${chosenProblem}`);
        if (chosenProblem === "friend") {
            try {
                function getNewFriend() {
                    const getRandomPerson = () => Math.floor(Math.random() * people.length); // get a random person's index
                    const chosenFriendIndex = getRandomPerson();
                    people.forEach(person => {
                        let alreadyFriends = false;
                        if (person.index == chosenFriendIndex) {
                            chosenPerson.friends.forEach(friend => {
                                if (friend.index === chosenFriendIndex) {
                                    alreadyFriends = true;
                                }
                            });
                            if (!alreadyFriends && person.index != chosenPerson.index) {
                                chosenPerson.problem = `friend ${chosenFriendIndex}`;
                                console.log(`made ${chosenFriendIndex} the chosen friend, it ${alreadyFriends}ly includes the chosenfriendindex (false is what we want and my code works)`);
                            }
                        }
                    });
                    if (chosenPerson.problem === "friend") { // this means they're already friends because the problem didn't change to having an index
                        getNewFriend();
                        console.log(chosenFriendIndex, "already friendsu");
                    }
                    console.log(chosenPerson);
                }
                getNewFriend();
            } catch (RangeError) { // already friends with everyone (created an infinite loop)
                chosenPerson.problem = null;
            }
        } else if (chosenProblem === "love") {
            function daysSince(date) {
                const inputDate = new Date(date);
                const currentDate = new Date();
                return Math.floor((currentDate - inputDate) / (1000 * 60 * 60 * 24)); // get the difference in milliseconds and convert to days
            }
            // filters out the chosen person's friends to see which ones work
            const possibleLoves = chosenPerson.friends.filter(chosenFriend => {
                const chosenFriendAsPerson = people.find(person => person.index == chosenFriend.index);
                // if been at least random between 0 and 5 days since became friends and attracted to (both ways)
                return chosenPerson.attractedTo.includes(chosenFriendAsPerson.gender) && chosenFriendAsPerson.attractedTo.includes(chosenPerson.gender) && daysSince(chosenFriend.date) > Math.random() * 5;
            });
            const chosenLoveAsFriend = possibleLoves[Math.floor(Math.random() * possibleLoves.length)];
            console.log("poss loves",possibleLoves);
            console.log("chosen friend to love", chosenLoveAsFriend);
            chosenPerson.problem = `love ${chosenLoveAsFriend.index}`;
            //console.log("days since became friends: ", daysSince(chosenFriend.date));
        }
    }
    //console.log(waitTime, chosenPerson);
    //saveStat("time", waitTime);
    saveStat("people", people);
    //setTimeout(getProblem, waitTime);
}
//setTimeout(getProblem, loadStat("time"));

export { saveStat, loadStat, deleteStat, deleteData, getProblem };