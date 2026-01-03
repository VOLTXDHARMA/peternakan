const swaggerSpec = require('../docs/swagger').default;

console.log('Checking Swagger spec for /auth/register...');
const registerPath = swaggerSpec.paths['/auth/register'];
if (registerPath && registerPath.post) {
    const schema = registerPath.post.requestBody.content['application/json'].schema;
    console.log('Required fields:', schema.required);
    console.log('Properties:', Object.keys(schema.properties));
    console.log('nomor_hp included:', schema.properties.nomor_hp ? 'YES' : 'NO');
    console.log('Example:', registerPath.post.requestBody.content['application/json'].example);
} else {
    console.log('Register endpoint not found in Swagger spec');
}
