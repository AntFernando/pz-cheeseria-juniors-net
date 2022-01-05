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
    public class CheesesControllerTests
    {
        [Fact]
        public void GetCheeses_ShouldReturnOkResponse_WhenDataFound()
        {
            //Arrange
            var controller = new CheesesController();
            //Act
            var actionResult = controller.GetCheeses() as OkObjectResult;
            //Assert
            Assert.IsType<OkObjectResult>(actionResult);

            var cheeses = Assert.IsType<Cheese[]>(actionResult.Value);
            Assert.Equal(8, cheeses.Length);
        }


    }
}
