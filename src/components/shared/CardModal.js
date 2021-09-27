import styled from "styled-components"


export default function CardModal({ type, isLoading, handler, postId, setModalState }) {
  return (
    <Superposition>
      <ConfirmScreen>
        {type === "deletePost" &&
          <>
            <p>Tem certeza que deseja <br /> excluir essa publicação?</p>
            <SuperpositionButtons>
              <CancelButton disabled={isLoading ? true : false} onClick={() => setModalState(false)}>
                Não, voltar
              </CancelButton>
              <ConfirmButton disabled={isLoading ? true : false} onClick={() => handler(postId)}>
                {isLoading ? "Excluindo..." : "Sim, excluir"}
              </ConfirmButton>
            </SuperpositionButtons>
          </>
        }
        {type === "repost" &&
          <>
            <p>Do you want to re-post <br /> this link?</p>
            <SuperpositionButtons>
              <CancelButton disabled={isLoading ? true : false} onClick={() => setModalState(false)}>
                No, cancel
              </CancelButton>
              <ConfirmButton disabled={isLoading ? true : false} onClick={() => handler(postId)}>
                {isLoading ? "sharing..." : "Yes, share!"}
              </ConfirmButton>
            </SuperpositionButtons>
          </>
        }
      </ConfirmScreen>
    </Superposition>
  )
}

const Superposition = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
`;

const ConfirmScreen = styled.div`
  position: relative;
  top: calc((100vh - 262px) / 2);
  left: calc((100vw - 597px) / 2);
  width: 597px;
  height: 262px;
  border-radius: 50px;
  background-color: #333333;
  font-family: "Lato", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    text-align: center;
    font-weight: bold;
    font-size: 34px;
    color: #ffffff;
    margin-bottom: 40px;
  }

  @media (max-width: 994px) {
    width: 100%;
    left: 0;
    border-radius: 0;
  }
`;

const SuperpositionButtons = styled.div`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  background-color: #ffffff;
  color: #1877f2;
  line-height: 22px;
  width: 134px;
  height: 37px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 27px;
  border: none;

  &:hover {
    cursor: pointer;
    border: 5px solid #1877f2;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ConfirmButton = styled.button`
  background-color: #1877f2;
  color: #ffffff;
  line-height: 22px;
  width: 134px;
  height: 37px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;

  &:hover {
    cursor: pointer;
    border: 5px solid #ffffff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;