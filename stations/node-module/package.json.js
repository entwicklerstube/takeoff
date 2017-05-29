export default props => t`
{
  "name": "${ props.project }",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "git@github.com:entwicklerstube/${ props.project }.git",
  "author": "${ props.user } <${ props.user_email }>",
  "license": "${ props.license }"
}
`
