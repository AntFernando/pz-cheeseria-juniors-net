using Microsoft.AspNetCore.Mvc;
using Moq;
using Pz.Cheeseria.Api.Controllers;
using Pz.Cheeseria.Api.Data;
using Pz.Cheeseria.Api.Models;
using System;
using System.Collections.Generic;
using Xunit;

namespace Pz.Cheeseria.Api.Test
{
    public class PurchasedItemsControllerTests
    {
        [Fact]
        public void getPurchasedItemsList_ShouldReturnOkResponse_WhenDataFound()
        {
            //Arrange
            var controller = new PurchasedItemsController();
            //Act
            var actionResult = controller.getPurchasedItemsList() as OkObjectResult;
            //Assert
            Assert.IsType<OkObjectResult>(actionResult);
            //var purchasedItemsList = Assert.IsType<List<PurchasedItems>>(actionResult.Value);
           
        }

        [Fact]
        public void savePurchasedItems_ShouldReturnOkResponse_WhenDataFound()
        {
            //Arrange
            var cheeseDate = new List<CheeseDetails>() { 
                new CheeseDetails() { Id = 1, cheeseQty = 1 },
                 new CheeseDetails() { Id = 2, cheeseQty = 3 }
            };
            var purchasedItemsDate = new PurchaseItems()
            {
                TotalPrice = 300,
                CheeseDetails = cheeseDate

            };
            var controller = new PurchasedItemsController();
            //Act
            var actionResult = controller.savePurchasedItems(purchasedItemsDate) as OkObjectResult;
            //Assert
            Assert.IsType<OkObjectResult>(actionResult);
            var isPurchased = Assert.IsType<PurchaseItems>(actionResult.Value);
            Assert.NotNull(isPurchased);
            Assert.True(isPurchased.PurchaseId != 0);
        }
    }
}
