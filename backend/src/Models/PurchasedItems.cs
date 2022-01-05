using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Pz.Cheeseria.Api.Models
{

    public class PurchaseItems
    {
     
        public int PurchaseId { get; set; }

        public DateTime PurchasedDate { get; set; }
        [Required]
        public decimal TotalPrice { get; set; }
        [Required]
        public List<CheeseDetails> CheeseDetails { get; set; }

    }

   
    public class CheeseDetails:Cheese
    {
       
        [Required]
        public int cheeseQty { get; set; }
    }

    public class PurchaseItemsResponse
    {
        [Required]
        public bool isPurchasedItemsSaved { get; set; }

      
    }
}
