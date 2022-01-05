using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Pz.Cheeseria.Api.Models;
using Pz.Cheeseria.Api.Data;
using Microsoft.AspNetCore.Http;

namespace Pz.Cheeseria.Api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PurchasedItemsController : Controller
    {
      
        [HttpPost]
        [Route("SavePurchaseItem")]
        [ProducesResponseType(statusCode: StatusCodes.Status200OK, type:typeof(PurchaseItems))]
        [ProducesResponseType(statusCode: StatusCodes.Status500InternalServerError)]
        public IActionResult savePurchasedItems(PurchaseItems purchasedItems)
        {
            try
            {
                PurchasedItemsRepository purchasedItemsRepository = new PurchasedItemsRepository();
                PurchaseItems purchaseItems = purchasedItemsRepository.savePurchasedItems(purchasedItems);
                return Ok(purchaseItems);
           
            }
            catch 
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
            
        }
        [HttpGet]
        [Route("GetPurchaseList")]
        [ProducesResponseType(statusCode:StatusCodes.Status200OK, Type =typeof(List<PurchaseItems>))]
        [ProducesResponseType(statusCode: StatusCodes.Status500InternalServerError)]
        public IActionResult getPurchasedItemsList()
        {
            try
            {
                PurchasedItemsRepository purchasedItemsRepository = new PurchasedItemsRepository();
                List<PurchaseItems> allPurchaseDetails = purchasedItemsRepository.GetPurchasedItemsList();
               
                return Ok(allPurchaseDetails);
            }
            catch
            {
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
           
        }
    }
}
