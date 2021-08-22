import css from 'styled-jsx/css'

export const globalStyles = css.global`
  html,
  body {
    background-image: radial-gradient(#cccccc 1px, #fdfdfd 1px),
      radial-gradient(#cccccc 1px, #fdfdfd 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
`

export default css`
  div {
    display: grid;
    height: 100vh;
    place-items: center;
  }

  main {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 500px) {
    main {
      height: 90vh;
      width: 500px;
    }
  }
`
