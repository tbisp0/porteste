describe('Home Page', () => {
  it('deve exibir o nome do site', () => {
    cy.visit('/');
    cy.contains('Tarcisio Bispo').should('be.visible');
  });
});
