import "./Joke.css";

/** A single joke, along with vote up/down buttons. */

function Joke2 ({text, key, id, votes, vote}){
  function renderJoke() {

    return (
      <div className="Joke">
        <div className="Joke-votearea">
          <button onClick={evt => vote(id, +1)}>
            <i className="fas fa-thumbs-up" />
          </button>

          <button onClick={evt => vote(id, -1)}>
            <i className="fas fa-thumbs-down" />
          </button>

          {votes}
        </div>

        <div className="Joke-text">{text}</div>
      </div>
    );
  }

  return(
    <>
        {renderJoke()}
    </>
  )
}

export default Joke2;
