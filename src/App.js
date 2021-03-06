import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
// import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import vocabForAdv19 from './Hke7xT6Tr.vocab.json';
import vocabForAdv20 from './ryqcvcfjD.vocab.json';
import vocabForSkCal from './S1w1XBy0S.vocab.json';
import vocabForMini from './Syq2j9ClO.vocab.json';

import graphForAdv19 from './Hke7xT6Tr.graph.json';
import graphForAdv20 from './ryqcvcfjD.graph.json';
import graphForSkCal from './S1w1XBy0S.graph.json';
import graphForMini from './Syq2j9ClO.graph.json';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntWeighted(weights) {
  var cumsum = weights.map((sum => value => sum += value)(0));
  var randomInt = getRandomInt(0, cumsum[cumsum.length - 1]);
  return cumsum.filter(value => value <= randomInt).length;
}

function RadioLabel(props) {
  const article = props.article;
  return (
    <div className="radio-label">
      <input
        type="radio"
        id={article.label}
        name="article"
        value={article.label}
        onChange={props.onChange}
      />
      <label htmlFor={article.label}>
        {article.label}
      </label>
    </div>
  );
}

function RadioForm(props) {
  const articles = props.articles;
  const radioLabels = articles.map((article, index) =>
    <RadioLabel key={index} article={article} onChange={props.onChange} />
  );
  return (
    <form className="radio-form">
      <span>
        ??????????????????:
      </span>
      {radioLabels}
    </form>
  );
}

function Button(props) {
  const label = props.label;
  const articleLabel = props.articleLabel;
  const words = props.words;

  const currentWord = words[words.length - 1];

  const className = articleLabel === '' ||
      (label === '????????????' && currentWord === 'EOS') ||
      (label === '????????????' && words.length === 0) ?
      'button' : 'button button--active';
  return (
    <button className={className} onClick={props.onClick}>
      {label}
    </button>
  );
}

function Buttons(props) {
  const articleLabel = props.articleLabel;
  const words = props.words;
  return (
    <div className="buttons">
      <Button
        label="????????????"
        articleLabel={articleLabel}
        words={words}
        onClick={props.onSampleClick}
      />
      <Button
        label="????????????"
        articleLabel={articleLabel}
        words={words}
        onClick={props.onResetClick}
      />
    </div>
  );
}

function WordItem(props) {
  const word = props.word;
  const className = word === 'EOS' ?
      "word-item word-item--special" : "word-item";
  return (
    <li className={className}>
      {word}
    </li>
  );
}

function WordList(props) {
  const words = props.words;
  const wordItems = words.map((word, index) =>
    <WordItem key={index} word={word} />
  );
  return (
    <ul className="word-list">
      {wordItems}
    </ul>
  );
}

function Chart(props) {
  const weights = props.weights;
  const sumWeights = weights.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
  
  const enumWeights = weights.map((weight, index) => [weight, index]);
  enumWeights.sort((a, b) => b[0] - a[0]);

  const sortedIndices = enumWeights.map(enumWeight => enumWeight[1]);

  const vocab = props.vocab;

  const sortedProbs = sortedIndices.map(
    sortedIndex => weights[sortedIndex] / sumWeights
  );
  const sortedWords = sortedIndices.map(sortedIndex => vocab[sortedIndex][1]);

  const data = {
    labels: sortedWords.slice(0, 5),
    datasets: [{
      label: '??????',
      data: sortedProbs.slice(0, 5),
      backgroundColor: 'rgb(248, 178, 0)'
    }]
  };

  return (
    <div className="chart">
      <Bar data={data} height={200} />
    </div>
  );
}

function Generator(props) {
  const [articleLabel, setArticleLabel] = useState('');
  const [vocabIndices, setVocabIndices] = useState([]);

  const articles = props.articles;

  const article = articles.find(({ label }) => label === articleLabel);

  const vocab = article === undefined ? [] : article.vocab;
  const graph = article === undefined ? [] : article.graph;

  const words = vocabIndices.map(vocabIndex => vocab[vocabIndex][1]);

  const weights = Array(vocab.length).fill(0);
  if (weights.length > 0) {
    const currentVocabIndex = vocabIndices.length === 0
        ? 0 : vocabIndices[vocabIndices.length - 1];
    const nextVocabIndices = graph[currentVocabIndex];
    for (var i = 0; i < nextVocabIndices.length; i++) {
      weights[nextVocabIndices[i][0]] = nextVocabIndices[i][1];
    }
  }

  function handleRadioChange(e) {
    setArticleLabel(e.target.value);
    setVocabIndices([]);
  }

  function handleSampleClick() {
    if (articleLabel === '' || words[words.length - 1] === 'EOS') {
      return;
    }
    const vocabIndex = getRandomIntWeighted(weights);
    setVocabIndices(prevVocabIndices => prevVocabIndices.concat(vocabIndex));
  }

  return (
    <section className="generator">
      <RadioForm articles={articles} onChange={handleRadioChange} />
      <Buttons
        articleLabel={articleLabel}
        words={words}
        weights={weights}
        onSampleClick={handleSampleClick}
        onResetClick={() => setVocabIndices([])}
      />
      <WordList words={words} />
      <Chart vocab={vocab} weights={weights} />
    </section>
  );
}

function Description() {
  return (
    <section className="description">
      <h3>?????????????????????????????????????????????</h3>
      <p>????????????????????????????????????????????????????????????????????????????????????????????????</p>
      <p>?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</p>
      <p>????????????????????????????????????????????????</p>
    </section>
  );
}

function Usage() {
  return (
    <section className="usage">
      <h3>?????????????????????</h3>
      <p>??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</p>
      <p>?????????????????????????????????????????????????????????????????????????????????trigram???????????????????????????????????????????????????????????????????????????????????????Top-5??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</p>
    </section>
  );
}

function LinkItem(props) {
  const article = props.article;
  return (
    <li className="link-item">
      <a href={article.url}>
        {article.title}
      </a>
    </li>
  );
}

function LinkList(props) {
  const articles = props.articles;
  const linkItems = articles.map((article, index) =>
    <LinkItem key={index} article={article} />
  );
  return (
    <ul className="link-list">
      {linkItems}
    </ul>
  );
}

function Links(props) {
  const articles = props.articles
  return (
    <section className="links">
      <h3>??????????????????</h3>
      <LinkList articles={articles} />
    </section>
  );
}

function Header() {
  return (
    <header>
      <div className="container">
        <h1 className="title">????????????????????????????????????????????????????????????</h1>
      </div>
    </header>
  );
}

function Main() {
  const articles = [
    {
      label: '????????????2019',
      title: '???????????????????????????????????????????????????????????????????????????????????????????????? - HackMD',
      url: 'https://hackmd.io/@kA0OlUhGRNmJkK7Nnx4QaQ/Hke7xT6Tr',
      vocab: vocabForAdv19,
      graph: graphForAdv19
    },
    {
      label: '????????????2020',
      title: '????????????????????????2020 ???????????????????????????????????? - HackMD',
      url: 'https://hackmd.io/@kA0OlUhGRNmJkK7Nnx4QaQ/ryqcvcfjD',
      vocab: vocabForAdv20,
      graph: graphForAdv20
    },
    {
      label: '??????????????????',
      title: '????????????????????? - HackMD',
      url: 'https://hackmd.io/@kA0OlUhGRNmJkK7Nnx4QaQ/S1w1XBy0S',
      vocab: vocabForSkCal,
      graph: graphForSkCal
    },
    {
      label: '??????????????????',
      title: '??????????????????(???) - HackMD',
      url: 'https://hackmd.io/@kA0OlUhGRNmJkK7Nnx4QaQ/Syq2j9ClO',
      vocab: vocabForMini,
      graph: graphForMini
    }
  ];
  return (
    <main>
      <div className="container">
        <Description />
        <Usage />
        <Generator articles={articles}/>
        <Links articles={articles}/>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <p className="copyright">?? 2021 ????????</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
