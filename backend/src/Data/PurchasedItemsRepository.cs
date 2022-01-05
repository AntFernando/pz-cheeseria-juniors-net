using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Pz.Cheeseria.Api.Models;

namespace Pz.Cheeseria.Api.Data
{
    public class PurchasedItemsRepository
    {

        private readonly string purchasedItemsFile = Path.Combine(Directory.GetCurrentDirectory(), "purchase.json");

        public PurchasedItemsRepository()
        {



            if (!File.Exists(purchasedItemsFile))
            {
                using (StreamWriter outputFile = new StreamWriter(purchasedItemsFile))
                {
                    string[] empty = new string[0];
                    outputFile.WriteLine(JsonSerializer.Serialize(empty));
                }

            }

        }
        /// <summary>
        /// This method saves the purchased item in json file
        /// </summary>
        /// <param name="purchasedItems"></param>
        /// <returns> boolean value true if saved</returns>
        public PurchaseItems savePurchasedItems(PurchaseItems purchasedItems)
        {
            PurchaseItems purchaseItems = null;
            try
            {
                var json = File.ReadAllText(purchasedItemsFile);
                List<PurchaseItems> listOfPurchasedItems = JsonSerializer.Deserialize<List<PurchaseItems>>(json) ?? new List<PurchaseItems>();
                if (listOfPurchasedItems != null)
                {
                    purchaseItems = ValidatePurchaseItems(purchasedItems, listOfPurchasedItems);
                    listOfPurchasedItems.Add(purchasedItems);
                    string jsonString = JsonSerializer.Serialize(listOfPurchasedItems);
                    File.WriteAllText(purchasedItemsFile, jsonString);
         
                }

            }
            catch (Exception)
            {
                //Log the exception

            }
            return purchaseItems;
        }
        /// <summary>
        /// This method validates all the input values for purchased items before saving it in json file
        /// </summary>
        /// <param name="purchaseItems"></param>
        /// <param name="purchaseItemsList"></param>
        /// <returns>returns purchase item object</returns>
        private PurchaseItems ValidatePurchaseItems(PurchaseItems purchaseItems, List<PurchaseItems> purchaseItemsList)
        {
            try
            {
                List<int> purchaseIds = purchaseItemsList.Select(items => items.PurchaseId).ToList();
                int purchaseId = 0;
                decimal totalPrice = 0;
                Random randomId = new Random();
                do
                {
                    purchaseId = randomId.Next(1, 100);
                } while (purchaseIds.Contains(purchaseId));
                if (purchaseId != 0)
                    purchaseItems.PurchaseId = purchaseId;
                purchaseItems.PurchasedDate = DateTime.Now;
                Cheese[] cheeseList = CheesesRepository.Cheeses;
                for (int i = 0; i < purchaseItems.CheeseDetails.Count; i++)
                {
                    var cheese = cheeseList.First(o => o.Id == purchaseItems.CheeseDetails[i].Id);
                    if (cheese != null)
                    {
                        purchaseItems.CheeseDetails[i].Title = cheese.Title;
                        totalPrice += purchaseItems.CheeseDetails[i].cheeseQty * cheese.Price;
                    }
                }

                totalPrice = decimal.Round(totalPrice, 2);
                if (purchaseItems.TotalPrice != totalPrice)
                {
                    purchaseItems.TotalPrice = totalPrice;
                }
            }
            catch (Exception)
            {

                throw;
            }

            return purchaseItems;
        }
        /// <summary>
        /// This method reads all the values from the purhase json file
        /// </summary>
        /// <returns>list of purchased items</returns>
        public List<PurchaseItems> GetPurchasedItemsList()
        {
            List<PurchaseItems> listOfPurchasedItems = new List<PurchaseItems>();
            try
            {
                var json = File.ReadAllText(purchasedItemsFile);
                listOfPurchasedItems = JsonSerializer.Deserialize<List<PurchaseItems>>(json);
                listOfPurchasedItems.Reverse();



            }
            catch (Exception)
            {

                //Log the exception
            }
            return listOfPurchasedItems;
        }
    }
}
