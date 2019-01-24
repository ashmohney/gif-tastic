/* 
User sees instructions about how to interact with app
        with three example buttons

There's also a form for User to add more topics, therefore more buttons

Interaction with page:

User can create a new topic-button
User clicks topic button, 10 still gifs appear on page

User clicks gif, it animates

 */

$(document).ready(function() {
        console.log("Hello Friends!");

let topic = ["guitars", "cats", "tools"];


function getGiphyInfo() { 

                                //setting const
        const gifName = $(this).attr("data-comedy");    ///tying buttons to data-comedy
        const myAPI = "&api_key=zembuPd1mfCVswe7EeSHIUGgHJokOIfa";
        const queryURL = "https://api.giphy.com/v1/gifs/search?q=funny+" + gifName + myAPI + "&limit=10";
                

                                //giphy api function
        $.ajax({                                        ///tried $.get, but the CORS error flared 
        url: queryURL,
        method: "GET",
        })
        .then(function(response) {
                
                const gifResults = response.data;
 
        for(let i=0; i<10; i++) {     //loops through number if gifs
                if (gifResults[i].rating !== "r") {    // mostly fam-friendly
                
                const gifTitle = gifResults[i].title;
                const paraTitle = $("<p>").text(gifTitle + ":").addClass("mt-1 mb-0");
                const gifDiv = $("<div>").addClass("float-left m-2 ");
                const gifHolder = $("<img alt='gifTastic Image'>").addClass("rounded")
                const gifRating = gifResults[i].rating;
                const paraRating = $("<p>").text("Rating: " + gifRating).addClass("mt");
                const gifToPage = $("#gifs-place");
                
                gifHolder.attr("src", gifResults[i].images.fixed_height_still.url);
                gifHolder.attr("still", gifResults[i].images.fixed_height_still.url);
                gifHolder.attr("animate", gifResults[i].images.fixed_height.url);

                                    /// setting click function for animation
                        $(gifHolder).on("click", function(event) {
                                const still = $(this).attr("still");
                                const animate = $(this).attr("animate");

                                if  ($(this).attr("src") == still) {
                                     $(this).attr("src", animate);
                                }
                                else {
                                     $(this).attr("src", still);
                                };
                        });
                
                
                gifDiv.append(gifHolder);
                gifDiv.append(paraTitle);
                gifDiv.append(paraRating);
                gifToPage.prepend(gifDiv);

                } 
        }
        });

};

                                ///putting buttons on the page
function createButtons() {
                             
        $("#place-btns").empty();
        
        for (let i=0; i<topic.length; i++) {  
                const makeBtn = $("<button>");

                makeBtn.addClass("newbtn btn btn-outline my-2 my-sm-0").attr("data-comedy", topic[i]).text(topic[i]).on("click", getGiphyInfo);

                const placeBtn = $("#place-btns")
                        
                placeBtn.append(makeBtn);

        }
        
}


                                //capturing User added gif information
        $("#topic-btn").on("click", function(event) {
        event.preventDefault();                 //preventeing pafe refresh
        
        const gifTopic = $("#gif-UserInput").val().trim();

                                       
        if (topic.indexOf(gifTopic.toLowerCase()) == -1 && gifTopic != "") {    // limit User button making, no blanks, no repeats
                topic.push(gifTopic); 
                };
                        
        createButtons();
});

createButtons();



});
