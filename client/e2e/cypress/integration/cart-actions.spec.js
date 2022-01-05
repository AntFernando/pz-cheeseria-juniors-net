/// <reference types="Cypress" />


describe('Cheese Cart Test',()=>{
  before(() => {
    cy.visit('/');
  })

  it.only('Verify cheese details', () => {
    cy.get('[data-cy=view-cheese-details-3]').click();
    cy.get('[data-cy=cheese-title]').should("have.text","ADELOST")
    cy.get('body').click();
    
  })

  it.only('Add cheese to cart', () => {
      cy.get('[data-cy=add-to-cart-5]').click();
      cy.get('[data-cy=add-to-cart-6]').click();
      cy.get('[data-cy=view-cart-btn]').click();
      cy.contains('2 Selected item');
      cy.get('[data-cy=purchase-btn]').should("exist")
      
  })

  it.only('Purchase the Items in cart', () => {
    cy.get('[data-cy=purchase-btn]').click();
    cy.get("[class*='swal2-container']").get("[class*='swal2-title']").should("have.text","Purchased Successfully")
   
  })
  

  it.only('Verify the recent Purchase', () => {
    cy.get("[class*='swal2-container']").contains('OK').click();  
    cy.get('[data-cy=recent-purchase-btn]').click();
    cy.get('mat-dialog-container').get('[data-cy=purchase-list]').first().find('[data-cy=purchased-cheese-id-5]').should("contain","JARLSBERG");
    cy.get('mat-dialog-container').get('[data-cy=purchase-list]').first().find('[data-cy=purchased-cheese-id-6]').should("contain","MAASDAM")

  })

})