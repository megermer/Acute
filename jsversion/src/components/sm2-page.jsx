const SM2Page = () => {
  return (
    <section id="cards-cont">
      <div className="card" id="question-card">
        <p className="card-title">Question</p>
        <p className="card-content">{card.question}</p>
      </div>
      <div
        className="card"
        id="answer-card"
        style={{ visibility: displayAnswer ? "visible" : "hidden" }}
      >
        <p className="card-title">Answer</p>
        <p className="card-content">{card.answer}</p>
      </div>
      <Stack direction="row" spacing={2} id="buttons-sm2">
        {sm2Btns === true ? (
          <Stack direction="row" spacing={2} id="sm2-btns">
            <Button
              variant="contained"
              color="success"
              onClick={displayCards}
              sx={{ bgcolor: "#1976d2" }}
            >
              Impossible
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={displayCards}
              sx={{ bgcolor: "#1976d2" }}
            >
              Hard
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={displayCards}
              sx={{ bgcolor: "#1976d2" }}
            >
              Normal
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={displayCards}
              sx={{ bgcolor: "#1976d2" }}
            >
              Easy
            </Button>
          </Stack>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={displayAnswerSM2}
            sx={{ bgcolor: "#1976d2" }}
          >
            {displayAnswer ? "Hide" : "Show"}
          </Button>
        )}
      </Stack>
    </section>
  );
};
