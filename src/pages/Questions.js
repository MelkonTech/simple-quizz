import {useEffect, useState} from "react";
import {decode} from "html-entities";
import {useDispatch, useSelector} from "react-redux";
import {handleScoreChange} from "../redux/actions";
import {useHistory} from "react-router";
import useAxios from "../hooks/useAxios";
import classnames from "classnames";
import {Box} from "@mui/system";
import {CircularProgress, Typography} from "@mui/material";
import {CustomQuestionButton} from "../assets/custom-components/CustomQuestionButton"
import "../assets/styles/question.css"

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
    const {
        question_category,
        question_difficulty,
        question_type,
        amount_of_question,
        score
    } = useSelector((state) => state);
    const history = useHistory();
    const dispatch = useDispatch();

    const [sortQuestions] = useState({
        'easy': 0,
        'medium': 1,
        'hard': 2,
    })

    let apiUrl = `/api.php?amount=${amount_of_question}`;

    if (question_category) {
        apiUrl = apiUrl.concat(`&category=${question_category}`);
    }
    if (question_difficulty) {
        apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
    }
    if (question_type) {
        apiUrl = apiUrl.concat(`&type=${question_type}`);
    }

    const {response, loading} = useAxios({url: apiUrl});
    const [questionIndex, setQuestionIndex] = useState(0);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (response?.results.length) {
            const question = response.results[questionIndex];

            // Sorting questions by difficulty
            response.results.sort((a, b) => (sortQuestions[a.difficulty] - sortQuestions[b.difficulty]));

            let answers = [...question.incorrect_answers];
            answers.splice(getRandomInt(question.incorrect_answers.length), 0, question.correct_answer);
            setOptions(answers);
        }
    }, [sortQuestions, response, questionIndex]);

    if (loading) {
        return (
            <Box mt={20}>
                <CircularProgress/>
            </Box>
        );
    }

    const handleClickAnswer = (e) => {
        const question = response.results[questionIndex];
        if (e.target.textContent === question.correct_answer) {
            dispatch(handleScoreChange(score + 1));
        }

        if (questionIndex + 1 < response.results.length) {
            setQuestionIndex(questionIndex + 1);
        } else {
            history.push("/score");
        }
    };

    const checkDifficulty = classnames("p", {
        easy: response.results[questionIndex].difficulty === "easy",
        medium: response.results[questionIndex].difficulty === "medium",
        hard: response.results[questionIndex].difficulty  === "hard",
    });

    return (
        <Box mt={5}>
            <Box mb={7}>
                <Typography style={{color: '#29af73', fontWeight: '500'}} variant="subtitle1" textAlign='center'>
                    Questions {questionIndex + 1} / {response?.results.length}
                </Typography>

                <Typography style={{color: '#000937'}} variant="h5" textAlign='center' fontWeight="600" mt={2}>
                    {decode(response.results[questionIndex].question)}
                </Typography>

                <Typography className={checkDifficulty} variant="h6" textAlign='center' fontWeight="600" mt={2}>
                    {decode(response.results[questionIndex].difficulty)}
                </Typography>
            </Box>

            {options.map((data, id) => (
                <Box mt={2} key={id}>
                    <CustomQuestionButton fullWidth onClick={handleClickAnswer} variant="contained">
                        <Typography variant="p">{decode(data)}</Typography>
                    </CustomQuestionButton>
                </Box>
            ))}

            <Box mt={5}>
                Score: {score} / {response.results.length}
            </Box>
        </Box>
    );
};

export default Questions;
