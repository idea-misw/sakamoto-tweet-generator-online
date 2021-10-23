import React from 'react';
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

import vocab_advent19 from './Hke7xT6Tr.vocab.json';
import graph_advent19 from './Hke7xT6Tr.graph.json';
import vocab_advent20 from './ryqcvcfjD.vocab.json';
import graph_advent20 from './ryqcvcfjD.graph.json';

const vocabs = {
  'advent19': vocab_advent19,
  'advent20': vocab_advent20
};
const graphs = {
  'advent19': graph_advent19,
  'advent20': graph_advent20
};

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

function getWeights(vocabIndex, vocab, graph) {
  var weights = Array(vocab.length).fill(0);
  var nextVocabIndices = graph[vocabIndex];
  for (var i = 0; i < nextVocabIndices.length; i++) {
    weights[nextVocabIndices[i][0]] = nextVocabIndices[i][1];
  }
  return weights;
}

function Description(props) {
  return (
    <div className="description">
      <h3>サカモトさんのツイートをジェネレート！</h3>
      <div className="paragraphs">
        <p className="paragraph">
          あのサカモトツイートジェネレータがついにオンラインで登場します。
        </p>
        <p className="paragraph">
          せっかくのジェネレータを手軽に試してみたい、という声が寄せられたり寄せられなかったりしました。
          そこで今回はツイートに代わって記事を学習。
          例によってサカモトっぽい文を生成してくれます。
        </p>
        <p className="paragraph">
          これであなたもサカモトに・・・。
        </p>
      </div>
    </div>
  )
}

function RadioLabel(prop) {
  const article = prop.article;
  return (
    <div className="radio-label">
      <input type="radio" id={article.value} name="article" value={article.value} onChange={prop.onChange} />
      <label htmlFor={article.value}>
        {article.label}
      </label>
    </div>
  )
}

function RadioForm(prop) {
  const articles = [
    {
      value: 'advent19',
      label: 'アドカレ2019',
    },
    {
      value: 'advent20',
      label: 'アドカレ2020',
    }
  ]
  const radioLabels = articles.map((article, index) =>
    <RadioLabel key={index} article={article} onChange={prop.onChange} />
  );
  return (
    <form className="radio-form">
      学習記事選択:
      {radioLabels}
    </form>
  );
}

function WordItem(props) {
  const word = props.word;
  const className = "word-item" + (word === 'EOS' ? " word-item--eos-token" : "");
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

function Generator(props) {
  const article = props.article;
  const sampleClassName = "button" + (article === '' || props.words[props.words.length - 1] === 'EOS' ? "" : " button--active");
  const resetClassName = "button" + (article === '' ? "" : " button--active");
  return (
    <div className="generator">
      <RadioForm onChange={props.onChange} />
      <div className="buttons">
        <button className={sampleClassName} onClick={props.onClickSample}>
          サンプル
        </button>
        <button className={resetClassName} onClick={props.onClickReset}>
          リセット
        </button>
      </div>
      <WordList words={props.words} />
    </div>
  );
}

function LinkItem(props) {
  const link = props.link;
  return (
    <li className="link-item">
      <a className="link-link" href={link.url}>
        {link.title}
      </a>
    </li>
  );
}

function LinkList(props) {
  const links = props.links;
  const linkItems = links.map((link, index) =>
    <LinkItem key={index} link={link} />
  );
  return (
    <ul className="link-list">
      {linkItems}
    </ul>
  );
}

function Links(props) {
  const links = [
    {
      url: 'https://idea-misw.hatenablog.com/entry/2020/12/16/000000',
      title: '【再掲】サカモトツイートジェネレータ - 洞窟の比喩',
    },
    {
      url: 'https://github.com/ku-nlp/python-textformatting',
      title: 'ku-nlp/python-textformatting'
    },
    {
      url: 'https://pypi.org/project/zenhan/',
      title: 'zenhan · PyPI'
    },
    {
      url: 'https://nlp.ist.i.kyoto-u.ac.jp/?JUMAN%2B%2B',
      title: 'JUMAN++ - KUROHASHI-CHU-MURAWAKI LAB'
    },
    {
      url: 'https://hackmd.io/@kA0OlUhGRNmJkK7Nnx4QaQ/Hke7xT6Tr',
      title: '【提案】自分の側に『推し』がいたら人類は最強になるんじゃないの？ - HackMD'
    },
    {
      url: 'https://hackmd.io/@kA0OlUhGRNmJkK7Nnx4QaQ/ryqcvcfjD',
      title: 'もちもちハム祭り2020 インターネットスペシャル - HackMD'
    }
  ];
  return (
    <div className="links">
      <h3>関連リンク</h3>
      <LinkList links={links} />
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: '',
      vocab: [],
      graph: [],
      vocabIndex: 0,
      weights: [],
      words: []
    };
  }

  handleChange(event) {
    var article = event.target.value;
    var vocab = vocabs[article];
    var graph = graphs[article];
    var weights = getWeights(0, vocab, graph)
    this.setState({
      article: article,
      vocab: vocab,
      graph: graph,
      vocabIndex: 0,
      weights: weights,
      words: []
    });
  }

  handleSample() {
    if (this.state.article === '') {
      return;
    }
    if (this.state.words[this.state.words.length - 1] === 'EOS') {
      return;
    }
    var bigram = this.state.vocab[getRandomIntWeighted(this.state.weights)];

    var word = bigram[1];
    var vocabIndex = this.state.vocab.indexOf(bigram);
    var weights = getWeights(vocabIndex, this.state.vocab, this.state.graph);

    this.setState({
      article: this.state.article,
      vocab: this.state.vocab,
      graph: this.state.graph,
      vocabIndex: vocabIndex,
      weights: weights,
      words: this.state.words.concat(word)
    });
  }

  handleReset() {
    if (this.state.article === '') {
      return;
    }
    this.setState({
      article: this.state.article,
      vocab: this.state.vocab,
      graph: this.state.graph,
      vocabIndex: 0,
      weights: getWeights(0, this.state.vocab, this.state.graph),
      words: []
    });
  }

  render() {
    return (
      <main>
        <div className="container">
          <Description />
          <Generator
            article={this.state.article}
            words={this.state.words}
            onChange={(event) => this.handleChange(event)}
            onClickSample={() => this.handleSample()}
            onClickReset={() => this.handleReset()}
          />
          <Links />
        </div>
      </main>
    );
  }
}

export default App;
