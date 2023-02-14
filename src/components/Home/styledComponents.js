import {Link} from 'react-router-dom'
import styled from 'styled-components'

export const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const FailureImage = styled.img`
  height: 150px;
  width: 100px;
`

export const FailureHead = styled.h1`
  font-weight: 700;
  font-family: 'Roboto';
  font-size: 30px;
  color: #1e293b;
`

export const FailurePara = styled.p`
  color: #465576;
  font-weight: 700;
  font-family: 'Roboto';
  font-size: 17px;
`

export const Retry = styled.button`
  padding: 15px;
  color: blue;
  cursor: pointer;
`
export const NavLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1e293b;
  text-decoration: none;
  margin-bottom: 32px;
`
