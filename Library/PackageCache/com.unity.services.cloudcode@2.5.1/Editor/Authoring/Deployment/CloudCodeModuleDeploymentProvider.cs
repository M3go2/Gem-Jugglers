using System;
using System.Collections.Specialized;
using System.Linq;
using Unity.Services.CloudCode.Authoring.Editor.Deployment.Modules;
using Unity.Services.CloudCode.Authoring.Editor.Modules;
using Unity.Services.CloudCode.Authoring.Editor.Shared.Infrastructure.Collections;
using Unity.Services.DeploymentApi.Editor;

namespace Unity.Services.CloudCode.Authoring.Editor.Deployment
{
    class CloudCodeModuleDeploymentProvider : DeploymentProvider
    {
        public override string Service => "Cloud Code C# Module";
        public override Command DeployCommand { get; }
        public override Command OpenCommand { get; }

        public CloudCodeModuleDeploymentProvider(
            CloudCodeModuleDeployCommand deployCommand,
            GenerateSolutionCommand generateSolutionCommand,
            CloudCodeModuleReferenceCollection scripts)
        {
            DeployCommand = deployCommand;
            OpenCommand = generateSolutionCommand;
            foreach (var script in scripts)
            {
                DeploymentItems.Add(script);
            }

            scripts.CollectionChanged += OnCollectionChanged;
        }

        void OnCollectionChanged(object sender, NotifyCollectionChangedEventArgs args)
        {
            var oldItems = args.OldItems?.Cast<CloudCodeModuleReference>() ?? Array.Empty<CloudCodeModuleReference>();
            var newItems = args.NewItems?.Cast<CloudCodeModuleReference>() ?? Array.Empty<CloudCodeModuleReference>();

            oldItems.ForEach(asset => DeploymentItems.Remove(asset));
            newItems.ForEach(asset => DeploymentItems.Add(asset));
        }
    }
}
